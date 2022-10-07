const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const ObjectId = require("mongodb").ObjectId;
const TransloaditClient = require("transloadit");
const nodeMailer = require("nodemailer");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
require("dotenv").config();

const transloadit = new TransloaditClient({
  authKey: process.env.TRANSLOADIT_AUTHKEY,
  authSecret: process.env.TRANSLOADIT_AUTHSECRET
});

mongoose.Promise = global.Promise;
//Models
const { User } = require("./models/user");
const { Inbox } = require("./models/inbox");
const { Topic } = require("./models/topic");
const { Message } = require("./models/messages");
const { Comment } = require("./models/comment");

//Custom MiddleWares
const { auth } = require("./middleware/auth");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

//init gfs
let gfs;

mongoose.createConnection(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  },
  (error, conn) => {
    if (error) {
      console.log(error);
      throw new Error("DB Connection Error");
    }
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("courses");
  }
);

//create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charLength = characters.length;
      for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength));
      }
      const filename = result + path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        metadata: req.body,
        bucketName: "courses"
      };

      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });

//Socket.io
io.on("connection", socket => {
  console.log("connected");

  socket.on("online", user_id => {
    User.findById(user_id, (err, user) => {
      user.online = true;
      user.save((err, doc) => {
        io.emit("online_status", true);
      });
    });
  });

  socket.on("offline", id => {
    User.findById(id, (err, user) => {
      user.online = false;
      user.save((err, doc) => {
        io.emit("online_status", false);
      });
    });
  });

  socket.on("online_users", status => {
    User.find({ online: status.online }, (err, doc) => {
      if (err) {
        io.emit("active_users", { success: false, data: err });
      }
      io.emit("active_users", { success: true, users: doc });
    });
  });

  socket.on("get_all_messages", data => {
    Message.find({ receiver: data.receiver }, (err, doc) => {
      if (err) {
        io.emit("all_messages", { success: false, data: err });
      }
      io.emit("all_messages", { success: true, data: doc });
    });
  });

  socket.on("msg_private_sent", data => {
    const message = new Message(data);
    message.save((err, doc) => {
      if (err) {
        io.emit("msg_private_updated", { success: false, data: err });
      }
      io.emit("msg_private_updated", { success: true, data: doc });
    });
  });

  socket.on("get_inbox_private", msg => {
    Message.find({ threadId: msg.threadId, sender: msg.sender }, (err, doc) => {
      if (err) {
        io.emit("messages_private", { success: false, data: err });
      }
      //console.log(doc)
      Message.find(
        { threadId: msg.sender, sender: msg.threadId },
        (err, docs) => {
          if (err) {
            io.emit("messages_private", { success: false, data: err });
          }
          io.emit("messages_private", {
            success: true,
            data: doc.concat(docs)
          });
        }
      );
    });
  });

  socket.on("add_comment", data => {
    const comment = new Comment(data);
    comment.save((err, doc) => {
      if (err) {
        io.emit("comment_added", { success: false, data: err });
      }
      io.emit("comment_added", { success: true, data: doc });
    });
  });

  socket.on("get_all_comments", data => {
    Comment.find({ type: data.type, topic: data.topic }, (err, doc) => {
      if (err) {
        io.emit("all_comments", { success: false, data: err });
      }
      io.emit("all_comments", { success: true, data: doc });
    });
  });

  socket.on("upVote_comment", id => {
    Comment.findById(id.id, (err, comment) => {
      if (err) {
        io.emit("comment_added", { success: false, data: err });
      }
      comment.upVotes += 1;
      comment.save((err, doc) => {
        if (err) {
          io.emit("comment_added", { success: false, data: err });
        }
        io.emit("comment_added", { success: true, data: doc });
      });
    });
  });

  socket.on("downVote_comment", id => {
    Comment.findById(id.id, (err, comment) => {
      if (err) {
        io.emit("comment_added", { success: false, data: err });
      }
      comment.downVotes += 1;
      comment.save((err, doc) => {
        if (err) {
          io.emit("comment_added", { success: false, data: err });
        }
        io.emit("comment_added", { success: true, data: doc });
      });
    });
  });

  socket.on("enroll_to_course", data => {
    User.findById(data.user, (err, user) => {
      if (err) {
        io.emit("enrolled_to_course", { success: false, data: err });
      }
      user.courses.push(data.course);
      user.save((err, doc) => {
        if (err) {
          io.emit("enrolled_to_course", { success: false, data: err });
        }
        io.emit("enrolled_to_course", { success: true, data: doc });
      });
    });
  });
});
io.on("disconnected", () => {
  console.log("disconnected");
});

//add a Course
app.post("/api/addCourse", upload.any(), (req, res) => {
  //res.json({file:req.files});
  res.redirect(`/course/${req.files[0].id}`);
});

//Edit Course
app.post("/api/editCourse/:id", (req, res) => {
  gfs.files.update(
    { _id: ObjectId(req.params.id) },
    { $set: { metadata: req.body } },
    (err, doc) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, doc: doc });
    }
  );
});

//Add a topic to a course
app.post("/api/addtopic", (req, res) => {
  const topic = new Topic(req.body);
  topic.save((err, doc) => {
    if (err) return res.json({ success: false, error: err });
    res.json({ success: true, doc: doc });
  });
});

//Create new user account or SignUp
app.post("/api/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.json({ error: err });
    if (!user) {
      const user = new User(req.body);
      user.save((err, doc) => {
        if (err) return res.json({ success: false, error: err });
        return res.status(200).json({
          success: true,
          user: doc
        });
      });
    } else {
      return res.json({ message: "User Already exist" });
    }
  });
});

//Edit Profile
app.post("/api/editProfile", (req, res) => {
  User.findById(req.body._id, (err, user) => {
    if (err) return res.json({ success: false, error: err });

    user.phone = req.body.phone;
    user.dob = req.body.dob;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.save((err, saved) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, user: saved });
    });
  });
});

//Create new Instructor account
app.post("/api/addInstructor", (req, res) => {
  User.findOne({ email: req.body.email }, (err, instructor) => {
    if (err) return res.json({ error: err });
    if (!instructor) {
      const instructor = new User(req.body);

      //Change the role to 1:- Instructor
      instructor.role = 1;

      //generate a random password for the added instructor
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charLength = characters.length;
      for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength));
      }
      instructor.password = result;

      instructor.save((err, doc) => {
        if (err) return res.json({ success: false, error: err });

        //Send an email to the instructor with a link to login with a password
        const transporter = nodeMailer.createTransport({
          host: process.env.MAIL_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
          }
        });

        transporter.sendMail(
          {
            from: "RuralMOOCs <no-reply@ruralmoocs.com>",
            to: doc.email,
            subject: "Instructor Account details",
            text: `Hello ${doc.fname}, your Instructor account has been created on RuralMoocs https://ruralmoocs.herokuapp.com; here's your password "${result}", you can login here https://ruralmoocs.herokuapp.com/login `,
            html: `<p>Hello ${doc.fname}, your Instructor account has been created on <a href="https://ruralmoocs.herokuapp.com">RuralMoocs</a>;</p> <p>here's your password "${result}", you can login <a href="https://ruralmoocs.herokuapp.com/login">here</a></p> `
          },
          (error, info) => {
            if (error) return res.json({ error: error });
            return res.status(200).json({
              success: true,
              message: `${doc.fname} added successfully as an Instructor, password to their account has been sent to ${doc.email}`
            });
          }
        );
      });
    }
    if (instructor) {
      instructor.role = 1;
      instructor.save((err, doc) => {
        if (err) return res.json({ success: false, error: err });
        const transporter = nodeMailer.createTransport({
          host: process.env.MAIL_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
          }
        });

        transporter.sendMail(
          {
            from: "RuralMOOCs <no-reply@ruralmoocs.com>",
            to: doc.email,
            subject: "Instructor Account details",
            text: `Hello ${doc.fname}, you have been added as an Instructor on RuralMoocs https://ruralmoocs.herokuapp.com; you can login here https://ruralmoocs.herokuapp.com/login \n If this wasn't you, please email us here support@ruralmoocs.com`,
            html: `<p>Hello ${doc.fname}, you have been added as an Instructor on <a href="https://ruralmoocs.herokuapp.com">RuralMoocs</a>;</p> <p> you can login <a href="https://ruralmoocs.herokuapp.com/login">here</a></p> <p>If this wasn't you, please email us here <a href="mailto:support@ruralmoocs.com">support@ruralmoocs.com</a></p> `
          },
          (error, info) => {
            if (error) return res.json({ success: false, error: error });
            return res.status(200).json({
              success: true,
              message: `${doc.fname} has successfully been added as an Instructor`
            });
          }
        );
      });
    }
  });
});

app.post("/api/message", (req, res) => {
  const inbox = new Inbox(req.body);

  inbox.save((err, doc) => {
    if (err) return res.json({ success: false, error: err });

    res.status(200).json({
      success: true,
      inbox: doc
    });
  });
});

app.post("/api/editInstructor/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.json({ success: false, error: err });
    user.role = req.body.role;
    user.email = req.body.email;
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.save((err, doc) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: doc });
    });
  });
});

app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.json({ error: err });
    if (!user) return res.json({ message: "User not found" });
    user.comparePasswords(req.body.password, (err, same) => {
      if (err) return res.json({ error: err });
      if (!same) return res.json({ message: "Wrong Password" });
      user.generateToken((err, user) => {
        if (err) return res.send(err);
        res
          .cookie("auth", user.token, {
            maxAge: 31 * Math.pow(10, 9),
            httpOnly: true
          })
          .json({
            same: true,
            id: user._id,
            email: user.email,
            role: user.role
          });
      });
    });
  });
});

//GET requests
app.get("/api/comments", (req, res) => {
  Comment.find((err, doc) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, comments: doc });
  });
});

app.get("/api/logout", auth, (req, res) => {
  req.user.deleteToken(req.user.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send("logged-out");
  });
});

app.get("/api/inbox", (req, res) => {
  Inbox.find((err, doc) => {
    if (err) return res.json(err);
    return res.json(doc);
  });
});

app.get("/api/inbox/:id", (req, res) => {
  Inbox.findById(req.params.id, (err, doc) => {
    if (err) return res.json(err);
    return res.json(doc);
  });
});

app.get("/api/user", auth, (req, res) => {
  res.json({
    isAuth: true,
    user: req.user
  });
});

app.get("/api/users", (req, res) => {
  User.find((err, doc) => {
    if (err) return res.json({ error: err });
    let data = [];
    doc.forEach((i, key) => {
      data[key] = {
        id: i._id,
        role: i.role,
        email: i.email,
        fname: i.fname,
        lname: i.lname
      };
    });
    return res.json(data);
  });
});

app.get("/api/users/:role", (req, res) => {
  User.find({ role: req.params.role }, (err, doc) => {
    if (err) return res.json(err);
    let data = [];
    doc.forEach((i, key) => {
      data[key] = {
        id: i._id,
        role: i.role,
        email: i.email,
        fname: i.fname,
        lname: i.lname
      };
    });
    return res.json(data);
  });
});

app.get("/api/user/:id", (req, res) => {
  User.find({ _id: ObjectId(req.params.id) }, (err, doc) => {
    if (err) return res.status(404).json(err);
    let data = [];
    doc.forEach((i, key) => {
      data[key] = {
        id: i._id,
        role: i.role,
        email: i.email,
        fname: i.fname,
        lname: i.lname
      };
    });
    return res.json(data);
  });
});

app.get("/api/courses", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ error: "No files exist" });
    }
    return res.json(files);
  });
});

app.get("/api/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ error: "No such file exists" });
    }

    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({ error: "Not an image" });
    }
  });
});

app.get("/api/course/:id", (req, res) => {
  gfs.files.findOne({ _id: ObjectId(req.params.id) }, (err, file) => {
    if (err) return res.json({ error: err });
    if (!file || file.length === 0) {
      return res.status(404).json({ error: "No files exists" });
    }
    return res.json(file);
  });
});

app.get("/api/topics/:course", (req, res) => {
  Topic.find({ course: req.params.course }, (err, files) => {
    if (err) return res.json({ error: err });
    if (!files || files.length === 0) {
      return res.json({ error: "No files exist" });
    }
    return res.json(files);
  });
});

app.get("/api/topics", (req, res) => {
  Topic.find((err, doc) => {
    if (err) return res.json({ error: err });
    return res.json(doc);
  });
});

app.get("/api/topic/:id", (req, res) => {
  Topic.findOne({ _id: ObjectId(req.params.id) }, (err, topic) => {
    if (err) return res.json({ error: err });
    if (!topic || topic.length === 0) {
      return res.status(404).json({ error: "No files exist" });
    }
    return res.json(topic);
  });
});

app.delete("/api/message/:id", (req, res) => {
  Inbox.findOneAndDelete({ _id: ObjectId(req.params.id) }, (err, doc) => {
    if (err) return res.json(err);
    if (!doc) {
      return res.status(404).json({ message: "Message doesnt exist" });
    }
    return res.json(doc);
  });
});

app.delete("/api/user/:id", (req, res) => {
  User.findOneAndDelete({ _id: ObjectId(req.params.id) }, (err, doc) => {
    if (err) return res.json(err);
    if (!doc) {
      return res.status(404).json({ message: "Specified user not found" });
    }
    return res.json(doc);
  });
});

app.delete("/api/course/:id", (req, res) => {
  gfs.files.deleteOne({ _id: ObjectId(req.params.id) }, (err, doc) => {
    if (err) return res.json({ error: err });
    return res.json({ doc, id: req.params.id });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, _ => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit");
});

import { combineReducers } from 'redux';

import courses from './course_reducer';
import user from './user_reducer';

const rootReducer=combineReducers({
    courses,
    user
})

export default rootReducer;
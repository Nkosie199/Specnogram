import * as Moment from 'moment'
import { Task } from '../types/types';

export const sortTasks = (tasks: Task[]) => {
    return tasks.sort(
        (a, b) => Moment(a.startDate).unix() - Moment(b.startDate).unix()
    );
} 
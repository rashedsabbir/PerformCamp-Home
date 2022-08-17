import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import auth from '../../../firebase.init';
import DetailsTaskModal from './DetailsTaskModal';

const UserTask = () => {
    const [tasks, setTasks] = useState([]);
    const [detailsTask, setDetailsTask] = useState(null);
    const [user] = useAuthState(auth);



    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/task/${user?.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('user task', data);
                    setTasks(data)
                })
        }
    }, [user]);
    return (
        <div>
       <div>
       {
                tasks.length === 0 ? <div className='text-center text-2xl text-red-300'><p>You have no task...</p></div>
                    :
                   
                    <div>
                        <div className="flex flex-col my-12">
                            <div className=" overflow-x-auto ">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full text-center divide-y divide-gray-200">
                                            <thead className="bg-gray-50 font-bold">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Serial
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Title
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Deadline
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Appointee
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >

                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                tasks.map((task, index) => {
                                                return (
                                                    <tr key={task._id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{index + 1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="">
                                                                {task.title}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{task.deadline}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">{task?.appointee}</div>
                                                        </td>

                                                        <td className="px-6 flex gap-4 py-4 whitespace-nowrap text-right text-sm font-medium">

                                                            <div className='lg:ml-12'>
                                                            <label for="details-task-modal" >  </label>
                                                            <label onClick={() => setDetailsTask(task)} for="details-task-modal" className="btn btn-primary rounded-xl mx-4 text-white">Details</label>

                                                            {/* <button onClick={() => setDetailsTask(task)} className=" btn btn-outline btn-error rounded-2xl mx-4">
                                                                    Details
                                                                </button> */}
                                                              
                                                                <button className=" btn btn-outline btn-error rounded-2xl">
                                                                    Complete
                                                                </button>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                )
                                                }
                                                    
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
       </div>

            {
            detailsTask && <DetailsTaskModal
                task={detailsTask}>
            </DetailsTaskModal>}

        </div>
    );
};

export default UserTask;
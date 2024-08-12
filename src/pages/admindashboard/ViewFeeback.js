import React, { useEffect, useState } from 'react';
import { db } from '../../config/Config';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './MenuEdit.css'

const ViewFeeback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            try {
                const feedbackCollection = collection(db, 'feedbacks');
                const feedbackSnapshot = await getDocs(feedbackCollection);
                const feedbackList = feedbackSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFeedbacks(feedbackList);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
            setLoading(false);
        };

        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'feedbacks', id));
            setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback.id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleSolve = async (id) => {
        try {
            const feedbackDoc = doc(db, 'feedbacks', id);
            await updateDoc(feedbackDoc, { status: 'Solved' });
            setFeedbacks(prevFeedbacks =>
                prevFeedbacks.map(feedback =>
                    feedback.id === id ? { ...feedback, status: 'Solved' } : feedback
                )
            );
        } catch (error) {
            console.error('Error updating feedback:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="status-section">
            <div className="dash-title">Feedback Management</div>
            {feedbacks.length === 0 ? (
                <p>No feedbacks available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>S_ID</th>
                            <th>Name</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map(feedback => (
                            <tr key={feedback.id}>
                                <td>{feedback.userId}</td>
                                <td>{feedback.name}</td>
                                <td>{feedback.feedback}</td>
                                <td>{feedback.status || 'Pending'}</td>
                                <td>
                                    <button onClick={() => handleSolve(feedback.id)}>Solve</button>
                                    <button onClick={() => handleDelete(feedback.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewFeeback;
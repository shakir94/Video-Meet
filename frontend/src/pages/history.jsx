import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import withAuth from '../utils/withAuth';

function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setLoading(true);
                const history = await getHistoryOfUser();
                
                console.log("History response:", history); // Debug
                
             
                if (Array.isArray(history)) {
                    setMeetings(history);
                } else if (history?.data && Array.isArray(history.data)) {
                    setMeetings(history.data);
                } else if (history?.meetings && Array.isArray(history.meetings)) {
                    setMeetings(history.meetings);
                } else {
                    console.error("Unexpected format:", history);
                    setMeetings([]);
                }
            } catch (err) {
                console.error("Error:", err);
                setError("Failed to load history");
                setMeetings([]);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div style={{ padding: "20px" }}>
            <IconButton onClick={() => routeTo("/home")}>
                <HomeIcon />
            </IconButton>

            <Typography variant="h4" sx={{ mb: 3, mt: 2 }}>
                Meeting History
            </Typography>

            {loading && <Typography>Loading...</Typography>}
            
            {error && <Typography color="error">{error}</Typography>}

            {!loading && !error && meetings.length === 0 && (
                <Typography>No meetings in your history yet</Typography>
            )}

            {!loading && Array.isArray(meetings) && meetings.length > 0 && meetings.map((e, i) => (
                <Card key={i} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Code: {e.meetingCode}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Date: {formatDate(e.date)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default withAuth(History); 
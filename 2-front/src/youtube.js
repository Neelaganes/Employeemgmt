import React, { useState } from 'react';
import axios from 'axios';

const YouTubeLinkForm = () => {
    const [youtubeLink, setYoutubeLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (youtubeLink) {  
            try {
                alert('submited successfully')
                const response = await axios.post(
                    'http://localhost:8001/download',
                    { url: youtubeLink },
                    { responseType: 'blob' }
                );
                alert('response recieved')
                // Create a link to download the video
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'video.mp4'); // Downloaded file name
                document.body.appendChild(link);
                link.click();
                link.remove();
                alert("Download request successful.");
                
            } catch (error) {
                console.error('Error downloading the video:', error);
                alert('Failed to download the video. Please check the console for details.');
            }
        } else {
            alert('Please enter a valid YouTube link');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Submit YouTube Link</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label htmlFor="youtube-link" style={styles.label}>YouTube Video Link</label>
                <input
                    type="url"
                    id="youtube-link"
                    name="youtube-link"
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: '0 auto',
        marginTop: '50px'
    },
    heading: {
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default YouTubeLinkForm;

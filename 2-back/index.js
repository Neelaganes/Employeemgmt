const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mysql = require('mysql');
const port = 8001;
const cors = require('cors');
const bodyparser = require('body-parser');
const { log } = require('console');

app.use(bodyparser.json());
app.use(cors());

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'sekhar'
})


connection.connect((err) => {
    if (!err) {
        log('database connected success');
    }
    else {
        log('check database');
        log(err);
    }
})


server.listen(port, () => {
    log('server created in' + port);
})


//login page
app.post('/logina', (req, res) => {
    console.log(req.body);
    connection.query('select * from admin where name="' + req.body.name + '" and password="' + req.body.password + '"', (err, row) => {
        if (res !== '') {
            res.send(row)
        }
        else {
            res.send(err);
        }
    })
})


app.post('/loginm', (req, res) => {
    console.log(req.body);
    connection.query('select * from manager where name="' + req.body.name + '" and password="' + req.body.password + '"', (err, row) => {
        if (res !== '') {
            res.send(row)
        }
        else {
            res.send(err);
        }
    })
})


app.post('/logine', (req, res) => {
    console.log(req.body);
    connection.query('select * from sarada where name="' + req.body.name + '" and password="' + req.body.password + '"', (err, row) => {
        if (res !== '') {
            res.send(row)
        }
        else {
            res.send(err);
        }
    })
})

//register page
app.post('/empregister', (req, res) => {
    console.log(req.body);

    connection.query('insert into sarada (name,email,mobile,designation,reportedto,dateofjoin,password) values("' + req.body.name + '","' + req.body.email + '","' + req.body.mobile + '","' + req.body.designation + '","' + req.body.reportedto + '","' + req.body.dateofjoin + '","' + req.body.password + '")', (err, row) => {
        if (res !== '') {
            res.send(row);
        }
        else {
            res.send(err);
        }
    })
})


app.post('/managerregister', (req, res) => {
    console.log(req.body);

    connection.query('insert into manager (name,email,mobile,experience,dateofjoin,department,password) values("' + req.body.name + '","' + req.body.email + '","' + req.body.mobile + '","' + req.body.experience + '","' + req.body.dateofjoin + '","' + req.body.department + '","' + req.body.password + '")', (err, row) => {
        if (res !== '') {
            res.send(row);
        }
        else {
            res.send(err);
        }
    }
    )
})


//details page
app.get('/details/1/:role', (req, res) => {
    if (req.params.role === 'admin') {
        connection.query('select * from manager ', (err, rows) => {
            if (res !== '') {
                res.send(rows);
            }
            else {
                res.send(err);
            }
        })
    }
})

app.get('/details/2/:role', (req, res) => {
    if (req.params.role === 'admin') {
        connection.query('select * from sarada', (err, rows) => {
            if (res !== '') {
                res.send(rows);
            }
            else {
                res.send(err);
            }
        })
    }
}
)

app.get('/details/:role/:name', (req, res) => {
    const { role, name } = req.params;

    if (role === 'manager') {
        const query = `
                SELECT * FROM sarada 
                WHERE id = (SELECT id FROM sarada WHERE reportedto = ?)
            `;

        connection.query(query, [name], (err, rows) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("An error occurred while fetching data.");
            }
            res.send(rows);
        });
    } else {
        res.status(403).send("Access denied. Role not authorized.");
    }
});


app.get('/details/:id', (req, res) => {
    connection.query('select * from sarada where id="' + req.params.id + '"', (err, row) => {
        if (res !== '') {
            res.send(row);
        }
        else {
            res.send(err);
        }
    })
})

//finance page
app.get('/finance/1/:role', (req, res) => {
    if (req.params.role === 'admin') {
        connection.query('select id,name,salary from manager ', (err, rows) => {
            if (res !== '') {
                res.send(rows);
            }
            else {
                res.send(err);
            }
        })
    }
})

app.get('/finance/2/:role', (req, res) => {
    if (req.params.role === 'admin') {
        connection.query('select id,name,salary from sarada', (err, rows) => {
            if (res !== '') {
                res.send(rows);
            }
            else {
                res.send(err);
            }
        })
    }
}
)

app.get('/finance/:role/:name', (req, res) => {

    connection.query('select id,name,salary from manager WHERE id = (SELECT id FROM manager WHERE name = "'+req.params.name+'")',(err,row)=>{
        if(!err)res.send(row);
        else res.send(err);
        })
    
});

//update page
app.post('/delete-m/:id', (req, res) => {
    connection.query('delete from manager where id="' + req.params.id + '"', (row, err) => {
        if (res !== '') {
            res.send(row)
        }
        else {
            res.send(err)
        }
    })
})

app.post('/delete-e/:id', (req, res) => {
    connection.query('delete from sarada where id="' + req.params.id + '"', (row, err) => {
        if (res !== '') {
            res.send(row)
        }
        else {
            res.send(err)
        }
    })
})


app.post('/update/manager/:id', (req, res) => {
    connection.query('update manager set  name="'+req.body.name+'",email="'+req.body.email+'",mobile="'+req.body.mobile+'",salary="'+req.body.salary+'",experience="'+req.body.experience+'",dateofjoin="'+req.body.dateofjoin+'",department="'+req.body.department+'",password="'+req.body.password+'" where id="'+req.params.id+'"',(row,err)=>{
        if(err)res.send(err);
        else res.send(row);
    })
});

app.post('/update/employee/:id', (req, res) => {
    connection.query('update sarada set name="'+req.body.name+'",email="'+req.body.email+'",mobile="'+req.body.mobile+'",salary="'+req.body.salary+'",designation="'+req.body.designation+'",reportedto="'+req.body.reportedto+'",dateofjoin="'+req.body.dateofjoin+'",password="'+req.body.password+'" where id="'+req.params.id+'"',(row,err)=>{
        if(err)res.send(err);
        else res.send(row);
    })
});

app.get('/:role/details-e/:id', (req, res) => {
    connection.query('select * from sarada where id="'+req.params.id+'"',(err,row)=>{
        if(!err)res.send(row);
        else res.send(err);
        })
});

app.get('/:role/details-m/:id', (req, res) => {
    connection.query('select * from manager where id="'+req.params.id+'"',(err,row)=>{
        if(!err)res.send(row);
        else res.send(err);
        })
});

//dashboard

// API endpoint to get row counts for two tables
app.get('/data', (req, res) => {
    // Query to get the row count for each table
    const table1 = 'sarada'; // replace with your first table name
    const table2 = 'manager'; // replace with your second table name
    const query = `
      SELECT 
        (SELECT COUNT(*) FROM ${table1}) AS table1Count,
        (SELECT COUNT(*) FROM ${table2}) AS table2Count;
    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
  
      res.json({
        table1Count: results[0].table1Count,
        table2Count: results[0].table2Count
      });
    });
  });


// youtube
const ytdl = require('ytdl-core');

const path = require('path');

// Route to download a YouTube video
app.post('/download', async (req, res) => {
    const { url } = req.body;

    // Validate the YouTube URL
    if (!ytdl.validateURL(url)) {
        return console.log('Invalid YouTube URL');
    }

    try {
        console.log('link is valid')
        const videoInfo = await ytdl.getInfo(url); // Get video information
        const title = videoInfo.videoDetails.title.replace(/[^\w\s]/gi, ''); // Clean title

        // Set headers for download
        res.header('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.mp4"`);

        // Stream the video as mp4
        ytdl(url, { format: 'mp4' }).pipe(res);
        console.log('response send')
    } catch (error) {
        console.error("Download Error:", error.message);
        res.status(500).json({ error: 'Error downloading the video' });
    }
});

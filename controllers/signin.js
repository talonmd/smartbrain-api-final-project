const handleSignin = (db, bcrypt) => (req, res) => {
const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('The data you have sumitted is not valid')
      }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => status(400).json('Unable to get user.'))
        } else {
         res.status(400).json('You have entered the wrong credentials')   
        }  
    })
    .catch(err => res.status(400).json('You have entered the wrong credentials'))
    }

    module.exports = {
        handleSignin: handleSignin
    }
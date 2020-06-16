const express = require('express')
const router = express.Router()
const User = require('../model/user')
const config = require('../config')
const jwt = require('jsonwebtoken');

router.post('/login', function(req, res){
    const { email, password } = req.body

    if(!email){
        //invalid error
        return res.status(422).send({errors:[{title:'User error',detail: 'Please fill email!'}]})
    }
    if(!password){
        //invalid error
        return res.status(422).send({errors:[{title:'User error',detail: 'Please fill password!'}]})
    }

    User.findOne({email}, function(err, foundUser) {
        if(err){
            // Error message
            return res.status(422).send({errors:[{title:'User error',detail: 'Something went wrong!'}]})
        }

        if(!foundUser){
            // Invalid error
            return res.status(422).send({errors:[{title:'User error',detail: 'User is not exist!'}]})
        } 
        if(!foundUser.hasSamePassword(password))
        {
            return res.status(422).send({errors:[{title:'User error',detail: 'Incorrect Password!'}]})
        }

        //jwt tokenを付与
        const token = jwt.sign({
            userId: foundUser.id,
            username: foundUser.username
          }, config.SECRET, { expiresIn: '1h' });
        
        return res.json(token)
    }
    )

})
router.post('/register', function(req, res){
    const { username, email, password, confirmPassword } = req.body

    if(!username){
        //invalid error
        return res.status(422).send({errors:[{title:'User error',detail: 'Please fill username!'}]})
    }
    if(!email){
        //invalid error
        return res.status(422).send({errors:[{title:'User error',detail: 'Please fill email!'}]})
    }
    if(!password){
        //invalid error
        return res.status(422).send({errors:[{title:'User error',detail: 'Please fill password!'}]})
    }
    if(password !== confirmPassword){
        //invalid error
        return res.status(422).send({errors:[{title:'User error',detail: 'Please check password!'}]})
    }
    User.findOne({email}, function(err, foundUser){
        if(err){
            // Error message
            return res.status(422).send({errors:[{title:'User error',detail: 'Something went wrong!'}]})
        }

        if(foundUser){
            // Invalid error
            return res.status(422).send({errors:[{title:'User error',detail: 'User already exist!'}]})
        } 


        const user = new User({username, email, password})
        user.save(function(err){
            if(err){
                // Error message
                return res.status(422).send({errors:[{title:'User error',detail: 'Something went wrong!'}]})
            }
            return res.json({"resigterd": true})
        })
     })
    
    // const productId = req.params.productId
    // Product.findById(productId, function(err, foundProducts){
    //     if(err)
    //     {
    //         return res.status(422).send({errors:[{title:'product error',detail: 'product not found'}]})
    //     }
    //     return res.json({username,email,password})
    // })
})

module.exports = router
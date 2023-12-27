// Dependencies and Modules
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const Product = require("../models/Product");

// Check Email Controller

module.exports.checkEmailExists = (reqBody) => {

	return User.find({ email: reqBody.email }).then(result => {

		if(result.length > 0){
			return true;


		} else {
			return false;
		}
	});
}

// User Registration Controller
module.exports.registerUser = (req, res) => {

    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    return newUser.save().then((user, error) => {
        if(error){
            return res.send(false)
        } else {
            return res.send(true)
        }
    });
}



// Non-Admin User Checkout (Create Order)
module.exports.createOrder = async (req, res) => {

    if(req.user.isAdmin){
        return res.send("Action Forbidden");
    }

    let isUserUpdated = await User.findById(req.user.id).then(user => {

        let newOrder = {
            products: {
                productId: req.body.productId,
                productName: req.body.productName,
                quantity: req.body.quantity
            },

            totalAmount: req.body.totalAmount
        };

        user.orderedProduct.push(newOrder);

        return user.save().then(user => true).catch(error => error.message);
    });

    if(isUserUpdated !== true){
        return res.send({
            message: isUserUpdated
        })
    }

    if(isUserUpdated){
		return res.send({
			message: "Order Successful."
		});
	}

}

// Retrieve User Details Controller
module.exports.getProfile = (req, res) => {
    
    return User.findById(req.user.id).then(result => {
        result.password = "";

        return res.send(result);
    }).catch(error => res.send(error));
}

// Login User Controller
module.exports.loginUser = (req, res) => {

	return User.findOne({email: req.body.email}).then(result => {

		// If User does not exist
		if(result == null){

			return false;

		// If user exists
		} else {

			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

			if(isPasswordCorrect) {

				res.send({
					access: auth.createAccessToken(result)
				});
			} else {

				return res.send(false);
			}
		}
	});
}

// Reset Password Controller
module.exports.resetPassword = async (req, res) => {
    try {
      const { newPassword } = req.body;
      const { id } = req.user; // Extracting user ID from the authorization header
  
      // Hashing the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Updating the user's password in the database
      await User.findByIdAndUpdate(id, { password: hashedPassword });
  
      // Sending a success response
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//   Update Profile Controller
module.exports.updateProfile = async (req, res) => {
    try {
      // Get the user ID from the authenticated token
      const userId = req.user.id;
  
      // Retrieve the updated profile information from the request body
      const { firstName, lastName, mobileNo } = req.body;
  
      // Update the user's profile in the database
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, mobileNo },
        { new: true }
      );
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update profile' });
    }
  }

//   Set User as an Admin (Admin Only)
module.exports.updateUserAsAdmin = async (req, res) => {
    try {
      // Check if the authenticated user is an admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admins can perform this action.' });
      }
  
      // Get the user ID to update from the request body
      const { userId } = req.body;
  
      // Find the target user in the database
      const targetUser = await User.findById(req.params.userId);
  
      // Check if the user exists
      if (!targetUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user as an admin
      targetUser.isAdmin = true;
  
      // Save the updated user to the database
      await targetUser.save();
  
      res.send(true);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//   Set Admin as User (Admin Only)
module.exports.updateAdminAsUser = async (req, res) => {
    try {
      // Check if the authenticated user is an admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Permission denied. Only admins can perform this action.' });
      }
  
      // Get the user ID to update from the request body
      const { userId } = req.body;
  
      // Find the target user in the database
      const targetUser = await User.findById(req.params.userId);
  
      // Check if the user exists
      if (!targetUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user as an admin
      targetUser.isAdmin = false;
  
      // Save the updated user to the database
      await targetUser.save();
  
      res.send(true);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//   Retrieve User Ordered Products
module.exports.getUserOrderedProducts = (req, res) => {

    return User.findById(req.user.id).then(result => {
  
        let results = result.orderedProduct;
      return res.send(results)
    }).catch(error => res.send(error));
  }

// Retrieve all User's Ordered Product (Admin Only)
module.exports.allOrders = (req, res) => {

    return User.find(req.user.orderedProduct).then(result => {
  
      return res.send(result);
  
    }).catch(error => res.send(error));
  }
  
//   Retrieve all Users' details (Admin Only)
module.exports.allUsers = (req, res) => {
    return User.find({}).then(result => {
        return res.send(result);
    });
}
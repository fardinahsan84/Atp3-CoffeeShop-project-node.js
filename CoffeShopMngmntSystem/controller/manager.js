var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();




router.get('/AllFoodItem', function(req, res){

	userModel.getAllFood(function(results){
    console.log(results);
		res.render('home/allFood', { userList : results, username: req.session.username});
	});
});

router.get('/allDeliveryMan', function(req, res){

	userModel.getAllDeliveryMan("delivery",function(results){
    console.log(results);
		res.render('home/allDeliveryMan', { userList : results, username: req.session.username});
	});
});

router.get('/create', function(req, res){
	res.render('home/add');
});


router.post('/create', function(req, res){

	var user ={
    name        :req.body.name,
    price       :req.body.price,
    status      :req.body.status,
    ingredients :req.body.ingredients

	}

	userModel.insert(user, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});


router.get('/editProfile/:id', function(req, res){

	userModel.getById(req.params.id, function(result){
		res.render('manager/edit', {user: result});
	});

});

router.post('/editProfile/:id', function(req, res){


	if (!req.files){
			 return res.status(400).send('No files were uploaded.');
	}else{
			 var file = req.files.uploaded_image;
			 var img_name=file.name;

			if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

						 file.mv('public/images/upload_images/'+file.name, function(err) {

							if(err){

								 return res.status(500).send(err);
							}else{
										var user = {
									    password     :req.body.password,
									    email     	 :req.body.email,
									    phone 			 :req.body.phone,
											address      :req.body.address,
											id           :req.params.id
											//image			   :req.img_name
										}
									

										userModel.updateManager(user,img_name, function(status){
				 						 		if(status){
				 						 			res.redirect('/home');
				 						 		}else{
				 						 			res.redirect('/manager/editProfile/'+req.params.id);
				 						 		}
		 						 	 });
						 }
						});
			}else {
					 message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
					 res.render('manager/edit',{message: message});
				 }
		}
});

router.get('/edit/:id', function(req, res){

	userModel.getByIdFood(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});

});

router.post('/edit/:id', function(req, res){

  var user = {
    price       :req.body.price,
    status      :req.body.status,
    ingredients :req.body.ingredients,
		id          :req.params.id
	}

	userModel.update(user, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/suggest/:id', function(req, res){

	userModel.getByIdFood(req.params.id, function(result){
		res.render('home/suggest', {user: result});
	});

});

router.post('/suggest/:id', function(req, res){
	var user={
		suggested	:req.body.suggested,
		id :req.params.id
	}
	userModel.updateSuggest(user, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/status/:id', function(req, res){

	userModel.getByIdFood(req.params.id, function(result){
		res.render('home/status', {user: result});
	});

});

router.post('/status/:id', function(req, res){
	var user={
		status	:req.body.status,
		id :req.params.id
	}
	userModel.updateStatus(user, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});


router.get('/ingredients/:id', function(req, res){

	userModel.getByIdFood(req.params.id, function(result){
		res.render('home/ingredients', {user: result});
	});

});

router.post('/ingredients/:id', function(req, res){
	var user={
		ingredients	:req.body.ingredients,
		id :req.params.id
	}
	userModel.updateIngredients(user, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});

router.get('/delete/:id', function(req, res){

	userModel.getByIdFood(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});

});

router.post('/delete/:id', function(req, res){

	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/manager/AllFoodItem');
		}else{
			res.redirect('/home');
		}
	});
});

module.exports = router;

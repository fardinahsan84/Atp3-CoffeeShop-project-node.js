var db = require('./db');

module.exports ={
//manager model
  getAll:function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},

  getById: function(id, callback){
		var sql = "select * from users where id="+id;
		db.getResults(sql, function(result){
      console.log('user module error')
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

  getByUsername: function(username, callback){
		var sql = "select * from users where username="+username;
		db.getResults(sql, function(result){
      console.log('user module error')
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

  validate: function(user, callback){
    var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
    db.getResults(sql, function(result){
      if(result.length > 0){
        callback(true);
      }else{
        callback(false);
      }
    });
  },

  updateManager: function(user,image, callback){
    var sql = "update users set password='"+user.password+"', email='"+user.email+"' ,phone='"+user.phone+"', address='"+user.address+"', image='"+image+"' where id='"+user.id+"'";
    db.execute(sql, function(status){
      if(status){
        callback(true);
      }else{
        callback(false);
      }
    });
  },

  getAllDeliveryMan:function(userType,callback){
		var sql = "select * from users where userType='"+userType+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},

  //food model
  getByIdFood: function(id, callback){
		var sql = "select * from food where id="+id;
		db.getResults(sql, function(result){
      console.log('user module error')
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

  getAllFood:function(callback){
		var sql = "select * from food";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},


  insert: function(user, callback){
		var sql = "insert into food values('', '"+user.name+"', '"+user.price+"','','"+user.status+"', '"+user.ingredients+"','','')";

		console.log(sql);

		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

  update: function(user, callback){
		var sql = "update food set price='"+user.price+"', status='"+user.status+"' ,ingredients='"+user.ingredients+"' where id='"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

  updateSuggest: function(user, callback){
		var sql = "update food set suggested='"+user.suggested+"' where id='"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

  updateStatus: function(user, callback){
		var sql = "update food set status='"+user.status+"' where id='"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

  updateIngredients: function(user, callback){
    var sql = "update food set ingredients='"+user.ingredients+"' where id='"+user.id+"'";
    db.execute(sql, function(status){
      if(status){
        callback(true);
      }else{
        callback(false);
      }
    });
  },

  delete: function(id, callback){
		var sql = "delete from food where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}

}

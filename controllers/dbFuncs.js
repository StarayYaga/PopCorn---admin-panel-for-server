const db_Controller = require("./db_controller")
const config = require('../config/config').db_path

exports.find_one = async function(email){
	await db_Controller.open(config)
	const query = await db_Controller.all(`select email from Users where email = '${email}'`)
	if (query.length !==0){
		return false
	}
	return true
}

exports.create_user = async function(email, password, primeToken){
	await db_Controller.open(config)
	try{
		await db.run(
			`insert into Users 
			(email, hashPassword, primeToken) 
			values 
			('${email}', '${password}','${primeToken}')
			;`
		)
	}catch(e){
		// console.log(e);
	} finally{
		db.close()
	}
}

exports.getToken = async function(email){
	await db_Controller.open(config)
	const query = await db_Controller.all(`select primeToken from Users where email = '${email}'`)
	return query[0].primeToken
}

exports.getHash = async function(email){
	await db_Controller.open(config)
	const query = await db_Controller.all(`select hashPassword from Users where email = '${email}'`)
	if (!query.length){
		return false
	}
	return query[0].hashPassword	
}

exports.update_token_user = async function(email, primeToken){
	await db_Controller.open(config)
	try{
		await db.run(
			`update Users  set
			primeToken='${primeToken}'
			where email='${email}'
			;`
		)
	}catch(e){
		// console.log(e);
	} finally{
		db.close()
	}
}

exports.pushService = async function(name){
	await db_Controller.open(config)
	try{
		await db.run(
			`insert into service 
			(name) 
			values 
			('${name}')
			;`
		)
	}catch(e){
		// console.log(e);
	} finally{
		db.close()
	}
}

exports.deleteService = async function(name){
	await db_Controller.open(config)
	try{
		await db.run(
			`delete from service 
			where name = '${name}'
			;`
		)
	}catch(e){
		// console.log(e);
	} finally{
		db.close()
	}
}

exports.getServices = async function(){
	await db_Controller.open(config)
	const query = await db_Controller.all(`select name from service`)
	return query
}
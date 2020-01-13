import base64 from 'base-64'

const host = '10.171.204.187'
const port = '8080'

const APIUtil = {
	processTextResults(res) {
		return Promise.resolve(res.text())
	},
	urlEncode(object) {
		var url = []
		for (var property in object) {
			var encodedKey = encodeURIComponent(property)
			var encodedValue = encodeURIComponent(object[property])
			url.push(encodedKey + "=" + encodedValue)
		}
		return url.join("&");
	},
	getAuthToken(username, password) {
		return fetch(`http://${host}:${port}/auth/get_token`, {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Basic ' + base64.encode(`${username}:${password}`),
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			redirect: 'follow'
		})
		.then(response => response.text())
		.then(result => { console.log(result); return JSON.parse(result)})
	},
	createUser(email, password) {
		const encode = APIUtil.urlEncode({ email, password })
		console.log(encode)
		return fetch(`http://${host}:${port}/auth/create_user`, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: encode,
			redirect: 'follow'
		})
		.then(response => response.text())
		.then(result => JSON.parse(result))
	},
	get(endpoint, token, body) {
		return fetch(endpoint, {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: APIUtil.urlEncode(body),
			redirect: 'follow'
		})
		.then(response => response.text())
		.then(result => JSON.parse(result))
	},
	post(endpoint, token, body) {
		return fetch(endpoint, {
			method: 'POST',
			headers: new Headers({
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: APIUtil.urlEncode(body),
			redirect: 'follow'
		})
		.then(response => response.text())
		.then(result => JSON.parse(result))
	},
	put(endpoint, token, body) {
		return fetch(endpoint, {
			method: 'PUT',
			headers: new Headers({
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: APIUtil.urlEncode(body),
			redirect: 'follow'
		})
		.then(response => response.text())
		.then(result => JSON.parse(result))
	},
	changePassword(token, email, old_password, new_password){
		return APIUtil.post(`http://${host}:${port}/auth/change_password`, token, {
			email,
			old_password,
			new_password
		})
	},
	getGreenhouses(token) {
		return APIUtil.get(`http://${host}:${port}/mobileapp/greenhouses/`, token, {})
	},
	getGreenhouse(token, greenhouse) {
		return APIUtil.get(`http://${host}:${port}/mobileapp/greenhouses/detail/${greenhouse}`, token, {})
	},
	postGreenhouse(token, name) {
		const randomSerial = Math.floor(Math.random() * 899999 + 100000)
		const seedlingHarvest = new Date(Date.now() + (24 * 3600 * 1000 * 14))
		const dateString = seedlingHarvest.getFullYear() + '-' + (seedlingHarvest.getMonth()+1) + '-' + seedlingHarvest.getDate()
		console.log('Serial number: ',randomSerial)
		console.log('Date: ',dateString)
		return APIUtil.post(`http://${host}:${port}/mobileapp/greenhouses/`, token, {
			name,
			'serial_no': randomSerial,
			'grid_password': 'test',
			'seedling_time': dateString
		})
	},
	postTier(token, greenhouse, tier, plant, numPlants, cycleTime) {
		const seedlingHarvest = new Date(Date.now() + (24 * 3600 * 1000 * cycleTime))
		const dateString = seedlingHarvest.getFullYear() + '-' + (seedlingHarvest.getMonth()+1) + '-' + seedlingHarvest.getDate()
		
		return APIUtil.put(`http://${host}:${port}/mobileapp/tiers/${greenhouse}/${tier}`, token, {
			'plant_id': plant,
			'num_plants': numPlants,
			'cycle_time': dateString
		})
	}
}

export default APIUtil
module.exports = {
	port: process.env.PORT,
	connectionString: process.env._ConnectionString,
	gstInfo: {
		url: 'utils/data.json'
	},
	ewbConfig: {
		generateToken: {
			url: `http://testapi.taxprogsp.co.in/ewaybillapi/dec/v1.03/authenticate?action=ACCESSTOKEN`,
			headers: {
				aspid: process.env.aspId,
				password: process.env.aspPwd,
				gstin: '{{ewbGstin}}',
				username: '{{username}}',
				ewbpwd: '{{ewbPwd}}'
			}
		},
		generateEWB: {
			url: `http://testapi.taxprogsp.co.in/ewaybillapi/dec/v1.03/ewayapi?action=GENEWAYBILL`,
			headers: {
				aspid: process.env.aspId,
				password: process.env.aspPwd
			}
		}
	}
}
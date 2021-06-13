module.exports = {
	port: 8000,
	connectionString: 'mongodb://localhost:27017/workstint',
	gstInfo: {
		url: 'utils/data.json'
	},
	docsConfig: {
		free: {
			savedDocsValidity: 2,		// Validity of saved documents
			limitForSaveDoc: 1,	// Save max 1 doc of each type per month
			limitToGenerateDoc: 2	// Allow generation of max 2 docs of each type per month
		},
		subscribed: {
			savedDocsValidity: 'unlimited',
			limitForSaveDoc: 'unlimited',	// Save max 1 doc of each type per month
			limitToGenerateDoc: 'unlimited'	// Allow generation of max 2 docs of each type per month
		}
	},
	ewbConfig: {
		generateToken: {
			url: `http://testapi.taxprogsp.co.in/ewaybillapi/dec/v1.03/authenticate?action=ACCESSTOKEN`,
			headers: {
				aspid: process.env.aspId || 1632253220,
				password: process.env.aspPwd || 'Pinto616!',
				gstin: '{{ewbGstin}}',
				username: '{{username}}',
				ewbpwd: '{{ewbPwd}}'
			}
		},
		generateEWB: {
			url: `http://testapi.taxprogsp.co.in/ewaybillapi/dec/v1.03/ewayapi?action=GENEWAYBILL`,
			headers: {
				aspid: process.env.aspId || 1632253220,
				password: process.env.aspPwd || 'Pinto616!'
			}
		}
	}
}
const mongoose = require('mongoose');
const { error } = require('../shared/logger');
const collectionName = 'companyDetails';
const component = 'gstin.component';
const getCollection = () => {
  return mongoose.connection.db.collection(collectionName);
};

// Mapper that maps response keys to response keys
const fieldMapper = {
  gstin: 'gstin',
  tradeName: 'tradeNam',
  natureOfBusiness: 'nba',
  dateOfRegistration: 'rgdt',
  permAddress: 'pradr.addr',
  adAddress: 'adadr.0.addr'
};

// The method to send the desired JSON structure for every gstin related query
const mapFields = (rawData) => {
  const resObj = {};
  if(!rawData || !rawData.gstin) {
    return resObj;
  }
  for(let k in fieldMapper) {
    let fieldToBeMapped = fieldMapper[k];
    // Check if the field has some parent property in the state..
    const fields = fieldToBeMapped.split('.');
    let valueToBeMapped = {...rawData};
    // If fields were nested, loop over and update the correct property
    if(fields.length>1) {
      fieldToBeMapped = fields.pop();   // take the final fieldName to be later assigned value to
      for(let f of fields) {
        valueToBeMapped = valueToBeMapped[f] || {}
      }
    }
    resObj[k] = valueToBeMapped[fieldToBeMapped];
  }
  return resObj;
}

// get GST details from local saved DBs
const getSavedCompanyInfo = async (gstin) => {  
  try {
    const gstCollection = getCollection();
    const q = {
      gstin: gstin
    };

    const companyInfo = await gstCollection.findOne(q);
    return companyInfo;
  } catch(exc) {
    throw exc;
  }
};

// Get the company information from the GST External API 
const getCompanyInfoFromAPI = async (gstin) => {
  try {
    const gstCollection = getCollection();
    const info = await 
    axios({
        method: 'GET',
        url: config.gstInfo.url
      })
      .catch((err) => {
        console.log(`GSTIN.getCompanyInfoFromAPI.error ${err}`);
        throw {success: false, msg: err};
      });
    // The fetched info needs to be saved in our local DB, so trigger that in the background
    saveCompanyInfoToDB(info);
    return info;
  }
  catch(exc) {
    console.log(`GSTIN.getCompanyInfoFromAPI.exception ${exc}`)
    throw {success: false, msg: exc};
  }
};

// Save the company Info into the DB for future reference.
const saveCompanyInfoToDB = (info) => {
  try{
    const gstCollection = getCollection();
    if(!info || !info.gstin) {
      console.log(`GSTIN.saveCompanyInfoToDB.noInfo ${info}`);
      return;
    }
    gstCollection.insertOne(info)
      .then((doc) => {
        console.log(`GSTIN.saveCompanyInfoToDB.savedDoc ${doc}`);
      })
      .catch((err) => {  
        console.log(`GSTIN.saveCompanyInfoToDB.error ${exc}`);
      })
  }
  catch(exc) {
    console.log(`GSTIN.saveCompanyInfoToDB.exception ${exc}`);
  }
};

const fetchGSTDetails = async (reqId, id) => {
  try {
    let gstDetails = {};
    gstDetails = await getSavedCompanyInfo(id)
      .catch(async (err) => {
        // In case of exception, fetch it from the GST API
        const info = await getCompanyInfoFromAPI(id)
          .catch((exc) => {
            throw exc;
          })
        return info;
      });
    if (!gstDetails) {
      throw 'No info available.';
    }
    return mapFields(gstDetails);
  } catch(exc) {
    error(`${component}.fetchGSTDetails.exception`, reqId, exc);
    throw exc;
  }
};

module.exports = {
  fetchGSTDetails,
};

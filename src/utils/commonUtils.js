const AppStatics = require('./appStatic.constant');

const { stateCodes } = AppStatics;
module.exports = {
  encrypt: (str) => {
    const encoding = 25;
    let encStr = '';
    for (let i = 0; i < str.length; i++) {
      encStr += str.charCodeAt(i).toString(encoding);
    }
    return encStr;
  },
  formatDate(d) {
    const dObj = new Date(d);
    const dd = `00${dObj.getDate()}`.substr(-2, 2);
    const mm = `00${dObj.getMonth() + 1}`.substr(-2, 2);
    const yyyy = dObj.getFullYear();
    // Convert the incoming date to dd/mm/yyyy format
    return `${dd}/${mm}/${yyyy}`;
  },
  validatePhone(p) {
    return p.match(/^\d{10}$/);
  },
  // Get the state code from the state name
  getStateCodeFromName(name) {
    console.log('Incoming name ', name);
    if (!name) {
      return '';
    }
    const stateInfo = stateCodes.find((s) => s.text.toLowerCase() === name.toLowerCase());

    if (stateInfo) {
      return stateInfo.value;
    }
    // Else return the incoming input, as it might be the state code itself
    return name;
  },
};

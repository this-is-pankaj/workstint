const EWBStatics = {
  supplyTypes: [
    {
      text: 'Outward',
      value: 'O',
    },
    {
      text: 'Inward',
      value: 'I',
    },
  ],
  subSupplyTypes: {
    O: [
      {
        value: '1',
        text: 'Supply',
      },
      {
        value: '3',
        text: 'Export',
      },
      {
        value: '4',
        text: 'Job Work',
      },
      {
        value: '5',
        text: 'For Own Use',
      },
      {
        value: '9',
        text: 'SKD/CKD/Lots',
      },
      {
        value: '10',
        text: 'Line Sales',
      },
      {
        value: '11',
        text: 'Recipient  Not Known',
      },
      {
        value: '12',
        text: 'Exhibition or Fairs',
      },
      {
        value: '8',
        text: 'Others',
      },
    ],
    I: [
      {
        value: '1',
        text: 'Supply',
      },
      {
        value: '2',
        text: 'Import',
      },
      {
        value: '5',
        text: 'For Own Use',
      },
      {
        value: '6',
        text: 'Job work Returns',
      },
      {
        value: '7',
        text: 'Sales Return',
      },
      {
        value: '9',
        text: 'SKD/CKD/Lots',
      },
      {
        value: '12',
        text: 'Exhibition or Fairs',
      },
      {
        value: '8',
        text: 'Others',
      },
    ],
  },
  docTypes: [
    {
      value: 'INV',
      text: 'Tax Invoice',
    },
    {
      value: 'CHL',
      text: 'Delivery Challan',
    },
    {
      value: 'BIL',
      text: 'Bill of Supply',
    },
    {
      value: 'BOE',
      text: 'Bill of Entry',
    },
    {
      value: 'CNT',
      text: 'Credit Note',
    },
    {
      value: 'OTH',
      text: 'Others',
    },
  ],
  transactionTypes: [
    {
      value: '1',
      text: 'Regular',
    },
    {
      value: '2',
      text: 'Bill To - Ship To',
    },
    {
      value: '3',
      text: 'Bill From - Dispatch From',
    },
    {
      value: '4',
      text: 'Combination of 2 and 3',
    },
  ],
  transportationMode: [
    {
      value: '1',
      text: 'Road',
    }, {
      value: '2',
      text: 'Rail',
    }, {
      value: '3',
      text: 'Air',
    }, {
      value: '4',
      text: 'Ship',
    },
  ],
  vehicleType: [
    {
      text: 'R',
      value: 'R',
    },
    {
      text: 'O',
      value: 'O',
    },
  ],
};

export default EWBStatics;

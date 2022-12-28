// const rawUrlParams = window.location.toString().split('?')[1].split('&');
// let urlParams = [];

// rawUrlParams.forEach((param) => {
//     const [key, value] = param.split('=');
//     urlParams.push({ key, value });
// })

// console.log(urlParams);

// const requiredParams = ['issue', 'description', 'id', 'type']
// let hasMissingParams = false;

// for (let i = 0; i < requiredParams.length; i++) {
//     const param = requiredParams[i];
//     const paramExists = urlParams.find((urlParam) => urlParam.key === param);
//     if (!paramExists) {
//         console.log(`Missing required param: ${param}`);
//         hasMissingParams = true;
//     }
// }

// if (!hasMissingParams) {
//     console.log('All required params are present');

//     const letters = /[a-zA-Z]/g;
//     const symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

//     const issue = urlParams.find((urlParam) => urlParam.key === 'issue').value.replace(/%20/g, ' ').replace(/%2C/g, ',').replace(/%3F/g, '?').replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%3B/g, ';').replace(/%3D/g, '=').replace(/\+/g, ' ');
//     const description = urlParams.find((urlParam) => urlParam.key === 'description').value.replace(/%20/g, ' ').replace(/%2C/g, ',').replace(/%3F/g, '?').replace(/%3A/g, ':').replace(/%2F/g, '/').replace(/%3B/g, ';').replace(/%3D/g, '=').replace(/\+/g, ' ');
//     const id = urlParams.find((urlParam) => urlParam.key === 'id').value.replace(letters, '').replace(symbols, '');
//     const type = urlParams.find((urlParam) => urlParam.key === 'type').value;

//     console.log(issue, description, id, type)
// }
import PropTypes from 'prop-types';

const httpFailureCodes = [400,404,500];
const httpSuccessCodes = [200,201];

const failure = ({message,code}) => {
    return {
        statusCode: code,
        body: JSON.stringify(
          {
            message: message,
          }
        ),
    }
}
failure.PropTypes = {
    message: PropTypes.string,
    code: PropTypes.oneOf(httpFailureCodes)
}
const success = ({body,code}) => {
    return {
        statusCode: code,
        body: JSON.stringify(
          body
        ),
    }
}
success.PropTypes ={
    body: PropTypes.oneOfType(validResponseTypes),
    code: PropTypes.oneOf(httpSuccessCodes)
}

validResponseTypes = [formA,formB
]
formA = PropTypes.any;
module.exports = {success,failure}
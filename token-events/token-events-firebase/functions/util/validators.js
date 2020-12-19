const isEmpty = (string) => {
    if(string.trim() === '') return true
    else return false
}
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(email.match(emailRegEx)) return true
    else return false
}

exports.validateSignupData = (data) => {
    let errors = {}
    if(isEmpty(data.name))                           errors.name = 'Campo vazio'
    if(isEmpty(data.email))                          errors.email = 'Campo vazio'
    else if(!isEmail(data.email))                    errors.email = 'Email inválido'
    if(isEmpty(data.password))                       errors.password = 'Campo vazio'
    if(data.password.length<6)                       errors.password = 'Senha deve ter pelo menos 6 caracteres'

    if(isEmpty(data.confirmPassword))                errors.confirmPassword = 'Campo vazio'
    if(data.confirmPassword !== data.password)       errors.confirmPassword = 'Senhas não são iguais'

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email))                            errors.email = "Campo vazio"
    else if(!isEmail(data.email))                       errors.email = 'Email inválido'
    if (isEmpty(data.password))                         errors.password = "Campo vazio"
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}
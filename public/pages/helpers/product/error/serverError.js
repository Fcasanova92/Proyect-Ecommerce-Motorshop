const messages = {
    err404 : '¡404 not Found!',
    err500 : '500, internal server error.',
    errDef : 'Ups!, an unexpected error occurred.'
}

export const getMessage = (status) => messages[`err${status}`];
const uuid = require('uuid');
class ContactDetail
{
    constructor(type, value)
    {
        this.contactDetailId = uuid.v4();
        this.type = type;
        this.value = value;
    }
}

module.exports = ContactDetail;
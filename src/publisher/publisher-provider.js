//const connection  = require('../../database/connection');
const Publisher = require('../../src/publisher/publisher');
class PublisherProvide {

    /**
     *
     * @param connection
     */
    constructor(connection) {

        this.connection = connection;
    }

    /**
     *
     * @param {int} publisherId
     * @return {Publisher}
     */
    search(publisherId) {

        return this.connection.select()
            .from('publishers')
            .where({id: publisherId, deleted_at: null})
            .then((results)=> {
                if(results.length === 0) {
                    return new Publisher("");
                }
                return this.make(results[0]);
            });
    }
    /**
     *
     * @param publisherRaw
     * @return {Publisher}
     */
    make(publisherRaw) {
        let publisher = new Publisher(publisherRaw.name);
        publisher.setId(publisherRaw.id);
        publisher.setAddress(publisherRaw.address);
        publisher.setPhone(publisherRaw.phone);
        return publisher;
    }
}

module.exports = PublisherProvide;


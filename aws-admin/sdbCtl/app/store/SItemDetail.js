
Ext.define('MyApp.store.SItemDetail', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.MdDomainInfo'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MyJsonPStore4',
            model: 'MyApp.model.MdDomainInfo',
            proxy: {
                type: 'ajax',
                url: '../modules/sdbGetDomainItemDetail.php',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        }, cfg)]);
    }
});
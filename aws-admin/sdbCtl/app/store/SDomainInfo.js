

Ext.define('MyApp.store.SDomainInfo', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.MdDomainInfo'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MyJsonPStore1',
            model: 'MyApp.model.MdDomainInfo',
            proxy: {
                type: 'ajax',
                url: '../modules/sdbGetDomain.php',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        }, cfg)]);
    }
});
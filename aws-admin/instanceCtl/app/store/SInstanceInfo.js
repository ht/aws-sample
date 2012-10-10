

Ext.define('MyApp.store.SInstanceInfo', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.MdInstanceInfo'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MyJsonPStore',
            model: 'MyApp.model.MdInstanceInfo',
            proxy: {
                type: 'ajax',
                url: '../modules/getInstanceInfo.php',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        }, cfg)]);
    }
});
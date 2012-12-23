

Ext.define('MyApp.store.MyJsonPStore2', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.MdSongs'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'MyJsonPStore2',
            model: 'MyApp.model.MdSongs',
            proxy: {
                type: 'ajax',
                url: '../modules/sdbGetDomainItems.php',
                reader: {
                    type: 'json',
                    root: 'items.rows'
                }
            }
        }, cfg)]);
    }
});


Ext.define('MyApp.store.SRegion', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.MdRegionInfo'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'MyJsonPStore3',
            model: 'MyApp.model.MdRegionInfo',
            proxy: {
                type: 'ajax',
                url: '../modules/sdbGetRegion.php',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        }, cfg)]);
    }
});


Ext.define('MyApp.view.CpInstanceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.cpinstancelist',

    draggable: true,
    frame: true,
    height: 303,
    width: 456,
    resizable: true,
    closable: false,
    collapsed: false,
    collapsible: false,
    header: true,
    title: 'サーバ一覧',
    forceFit: true,
    store: 'SInstanceInfo',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'gridcolumn',
                    width: 63,
                    dataIndex: 'instanceId',
                    text: 'InstanceId'
                },
                {
                    xtype: 'gridcolumn',
                    width: 66,
                    dataIndex: 'instanceState',
                    text: 'State'
                },
                {
                    xtype: 'gridcolumn',
                    width: 72,
                    dataIndex: 'placement',
                    text: 'place'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'tag_name',
                    text: 'tag'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'privateIp',
                    text: 'privateIP'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'tag_type',
                    text: 'type'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'vpcId',
                    text: 'vpc'
                }
            ],
            viewConfig: {

            }
        });

        me.callParent(arguments);
    },

    GetSeleteInstance: function() {
        //this.MyGridView.
    }

});
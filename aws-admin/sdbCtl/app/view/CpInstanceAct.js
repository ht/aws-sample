

Ext.define('MyApp.view.CpInstanceAct', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cpinstanceAct',

    requires: [
        'MyApp.view.CpDomainList'
    ],

    ctlRegion: '',
    width: 150,
    layout: {
        type: 'fit'
    },
    title: '分類',

    initComponent: function() {
        var me = this;

        me.addEvents(
            'evTabViewChange',
            'evSearchData',
            'evEditDomain'
        );

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    fnInstanceActionCall: function(type, cond) {

                        if(type.indexOf('Create')>=0||type.indexOf('Delete')>=0)
                        {
                            this.fireEvent('evEditDomain',type,cond);
                            this.ctlRegion = cond.region;
                        }
                        else
                        {
                            cond = {region:cond.region,domain:cond.domain};

                            this.fireEvent('evSearchData',type,cond);

                        }
                    },
                    ctlRegion: '',
                    height: 255,
                    itemId: 'acttab',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            callaction: function(button) {
                                var dg = Ext.ComponentQuery.query('#crdmview')[0];
                                var rg = Ext.ComponentQuery.query('#rgview')[0];

                                var cond = null;
                                //検索条件の指定
                                var gd = button.ownerCt.down('#rgview');

                                var sm = gd.getSelectionModel();
                                var r = sm.getSelection();

                                cond = {"region": r[0].data.region};

                                dg.ctlTag = button.ctlTag;
                                dg.ctlCond = cond;

                                dg.show();
                                rg.hide();

                            },
                            fnLoadDomain: function() {
                                var cond = null;
                                //検索条件の指定
                                var gd = button.ownerCt.down('#rgview');


                                var sm = gd.getSelectionModel();
                                var r = sm.getSelection();

                                if(r.length>0){
                                    cond = {"region": r[0].data.region};

                                    button.ownerCt.ownerCt.fnInstanceActionCall(button.ctlTag,cond);
                                }
                            },
                            itemId: 'iddomain',
                            layout: {
                                type: 'fit'
                            },
                            title: 'ドメイン',
                            dockedItems: [
                                {
                                    xtype: 'button',
                                    ctlTag: 'ViewDomain',
                                    dock: 'top',
                                    itemId: 'dmsearch',
                                    text: '検索',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick2,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    ctlTag: 'CreateDomain',
                                    dock: 'top',
                                    text: '作成',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick21,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    ctlTag: 'DeleteDomain',
                                    dock: 'top',
                                    text: '削除',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick211,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'panel',
                                    hidden: true,
                                    itemId: 'crdmview',
                                    title: 'My Panel',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'dmname',
                                            width: 318,
                                            fieldLabel: 'domain'
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, event) {
                                                var cond = button.ownerCt.ctlCond;

                                                var dg = Ext.ComponentQuery.query('#crdmview')[0];
                                                var rg = Ext.ComponentQuery.query('#rgview')[0];
                                                //var rg = Ext.select('#rgview');

                                                var txt = dg.down('#dmname').value;

                                                cond = {"region": cond.region,"domain":txt};

                                                button.ownerCt.ownerCt.ownerCt.
                                                fnInstanceActionCall(button.ownerCt.ctlTag,cond);

                                                dg.hide();
                                                rg.show();

                                            },
                                            itemId: 'idopok',
                                            width: 65,
                                            text: 'ok'
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, event) {
                                                var dg = Ext.ComponentQuery.query('#crdmview')[0];
                                                var rg = Ext.ComponentQuery.query('#rgview')[0];
                                                //var rg = Ext.select('#rgview');


                                                dg.hide();
                                                rg.show();

                                            },
                                            itemId: 'idopcancel',
                                            width: 65,
                                            text: 'cancel'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'rgview',
                                    title: 'My Grid Panel',
                                    store: 'SRegion',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'regionname',
                                            text: 'regionname'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'region',
                                            text: 'region'
                                        }
                                    ],
                                    viewConfig: {

                                    },
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onRgviewItemDblClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 229,
                            itemId: 'iditem',
                            width: 567,
                            layout: {
                                type: 'fit'
                            },
                            title: 'データ',
                            dockedItems: [
                                {
                                    xtype: 'button',
                                    ctlTag: 'ViewItems',
                                    dock: 'top',
                                    text: '検索',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick6,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'cpdomainlist',
                                    height: 208,
                                    itemId: 'dmview',
                                    header: false
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 229,
                            itemId: 'idtest',
                            width: 567,
                            layout: {
                                type: 'fit'
                            },
                            title: 'test',
                            dockedItems: [
                                {
                                    xtype: 'button',
                                    ctlTag: 'ViewItems',
                                    dock: 'top',
                                    text: '検索',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick61,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            items: [
                                {
                                    xtype: 'cpdomainlist',
                                    height: 208,
                                    header: false
                                }
                            ]
                        }
                    ],
                    listeners: {
                        tabchange: {
                            fn: me.onTabpanelTabChange,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick2: function(button, e, options) {
        var cond = null;
        //検索条件の指定
        var gd = button.ownerCt.down('#rgview');


        var sm = gd.getSelectionModel();
        var r = sm.getSelection();

        if(r.length>0){
            cond = {"region": r[0].data.region};
            this.ctlRegion = r[0].data.region;

            button.ownerCt.ownerCt.fnInstanceActionCall(button.ctlTag,cond);
        }
    },

    onButtonClick21: function(button, e, options) {



        button.ownerCt.callaction(button);

    },

    onButtonClick211: function(button, e, options) {

        button.ownerCt.callaction(button);


    },

    onRgviewItemDblClick: function(tablepanel, record, item, index, e, options) {

        var bt = this.ownerCt.down('#dmsearch');
        bt.fireEvent('click',bt);

    },

    onButtonClick6: function(button, e, options) {
        var cond = null;
        //検索条件の指定
        var gd = button.ownerCt.down('#dmview');


        var sm = gd.getSelectionModel();
        var r = sm.getSelection();

        cond = {region:this.ctlRegion,"domain": r[0].data.domain};

        button.ownerCt.ownerCt.fnInstanceActionCall(button.ctlTag,cond);

    },

    onTabpanelTabChange: function(tabPanel, newCard, oldCard, options) {
        this.fireEvent('evTabViewChange',newCard);

    },

    onButtonClick61: function(button, e, options) {

    }

});
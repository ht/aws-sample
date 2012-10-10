

Ext.define('MyApp.view.CpInstanceAct', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cpinstanceAct',

    width: 150,
    title: 'サーバ分類',

    initComponent: function() {
        var me = this;

        me.addEvents(
            'evStartInstance',
            'evStopInstance',
            'evInstanceListRefresh'
        );

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'tabpanel',
                    dock: 'top',
                    height: 209,
                    width: 150,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            title: '開発',
                            dockedItems: [
                                {
                                    xtype: 'button',
                                    ctlTag: 'ViewInstance',
                                    dock: 'top',
                                    text: 'dev',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick2,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    ctlTag: 'ViewInstance',
                                    dock: 'top',
                                    text: 'devtest',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick3,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    ctlTag: 'ViewInstance',
                                    dock: 'top',
                                    text: 'other',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick4,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'デ開',
                            dockedItems: [
                                {
                                    xtype: 'button',
                                    ctlTag: 'ViewInstance',
                                    dock: 'top',
                                    text: 'acdgdev',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick6,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: '運用',
                            dockedItems: [
                                {
                                    xtype: 'button',
                                    ctlTag: 'ViewInstance',
                                    dock: 'top',
                                    text: 'release',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick5,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'button',
                    ctlTag: 'StopInstance',
                    dock: 'bottom',
                    text: '停止',
                    listeners: {
                        click: {
                            fn: me.onButtonClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'button',
                    ctlTag: 'StartInstance',
                    dock: 'bottom',
                    text: '起動',
                    listeners: {
                        click: {
                            fn: me.onButtonClick1,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick2: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,button.text);

    },

    onButtonClick3: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,button.text);

    },

    onButtonClick4: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,button.text);

    },

    onButtonClick6: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,button.text);

    },

    onButtonClick5: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,button.text);

    },

    onButtonClick: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,null);

    },

    onButtonClick1: function(button, e, options) {
        this.fnInstanceActionCall(button.ctlTag,null);

    },

    fnInstanceActionCall: function(acttype, value) {
        switch (acttype){
            case 'StartInstance':
            this.fireEvent('evStartInstance',value);
            break;
            case 'StopInstance':
            this.fireEvent('evStopInstance',value);
            break;
            case 'ViewInstance':
            this.fireEvent('evInstanceListRefresh',value);
            break;
        }
    }

});
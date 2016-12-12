var viewer;

function loaded() {

    var myViewerDiv = document.getElementById('MyViewerDiv');
    var configs = {
        extensions: ['MyAwesomeExtension']
    };
    // var config3d = {
    //     extensions: ["Autodesk.InViewerSearch"],
    //     inViewerSearchConfig : {
    //         uiEnabled: true,
    //         clientId: "adsk.forge.default",
    //         sessionId: "Session-ID-example-F969EB70-242F-11E6-BDF4-0800200C9A66",
    //         loadedModelTab: {
    //             enabled: true,  //if false we hide the tab
    //             displayName: 'This View',
    //             pageSize: 50
    //         },
    //         relatedItemsTab: {
    //             enabled: true,  //if false we hide the tab
    //             displayName: 'This Item',
    //             pageSize: 20
    //         }
    //     }
    // };
    //viewer = new Autodesk.Viewing.Private.GuiViewer3D(myViewerDiv,configs);
    viewer = new Autodesk.Viewing.Viewer3D(myViewerDiv, configs);
    console.log('loaded');
    var options = {
        'env': 'Local',
        'document': './cube/3dBox.svf'
    };

    //var documentUrl = 'http://localhost:3000/Cube/3dBox.svf';

    Autodesk.Viewing.Initializer(options, function onInitialized() {
        console.log('initialized');
        viewer.start();
        viewer.loadModel(options.document, options, onSucess, onFail);
    });

    function onSucess(model) {
        var data = model.getData();
        console.log(data);
        console.log('Sucess!');
    };

    function onFail(error) {
        console.log('Fail');
    };
};
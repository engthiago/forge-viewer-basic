function navigationLock(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
}

navigationLock.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
navigationLock.prototype.constructor = navigationLock;

navigationLock.prototype.load = function () {

    console.log('navigation lock loaded');

    viewerLeft.onCameraChange = this.onCameraChangeEvent.bind(this);
    viewerLeft.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, this.onCameraChangeEvent);

    return true;
};

navigationLock.prototype.unload = function () {
    return true;
};

navigationLock.prototype.onCameraChangeEvent = function (event) {
    //Apply target
    console.log('targetChanged');
    
    var vLeftPosition = viewerLeft.navigation.getPosition();
    var vLeftOri = viewerLeft.navigation.getTarget();

    viewerRight.navigation.setView(vLeftPosition, vLeftOri);
};

Autodesk.Viewing.theExtensionManager.registerExtension('navigationLock', navigationLock);
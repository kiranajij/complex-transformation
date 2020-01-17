function onChangeCanvasSize(val){
    let nSize = int(val);
    config.canvasSize = nSize;
    canv.resize(nSize, nSize);
}

function onChangeGridSpacing(val){
    let nVal = int(val);
    config.spacing = nVal;

    // print(config.spacing)
}

function onChangeLimits(val){
    let nval = int(val);
    config.limits = nval;
}

function onChangeAutofill(){
    if (!config.autoFill){
        clearPoints();
        autoFillPoints();
        config.autoFill = true;
        doms.autofill.checked = true;
    } else {
        clearPoints();
        config.autoFill = false;
        doms.autofill.checked = false;
    }
}

function mouseInCanvas(x, y){
    if (x < width  && x > 0 && y> 0 && y< height){
        return true;
    } else {
        return false;
    }

}
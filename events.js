function onChangeCanvasSize(val){
    let nSize = int(val);
    config.canvasSize = nSize;
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
    } else {
        clearPoints();
        config.autoFill = false;
    }
}
const imageSelected = (e,selectedImage,setSelectedImage) => {
    var data = [...selectedImage];
    if (e.target.checked) {
        data.push(e.target.value);
        setSelectedImage(data);
    }
    else {
        const index = data.indexOf(e.target.value);
        if (index > -1) {
            data.splice(index, 1);
        }
        setSelectedImage(data);
    }
}
export default imageSelected;
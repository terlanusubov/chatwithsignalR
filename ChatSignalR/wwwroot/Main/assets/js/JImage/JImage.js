"use strict";
class ImageFile {
    Id;
    IsMain;
    Order;
    File;
    Img;
    Width;
    Height;

    constructor(file) {
        this.Img = null;
        this.File = file;
        this.IsMain = false;
    }

    set File(file) {
        if (this.IsFile(file)) {
            this.File = file;
        }
        else {
            console.log("Just the File can be attached");
            //throw new Error("Just the File can be attached");
        }
    };

    set IsMain(isMain) {
        if (typeof isMain === 'boolean') {
            this.IsMain = isMain;
        }
        else {
            console.log("Just the Boolean can be attached");
            //throw new Error("Just the Boolean can be attached");
        }
    }

    Clone() {
        let imageFile = new ImageFile(this.File);
        imageFile.Id = this.Id;
        imageFile.Img = this.Img;
        imageFile.Width = this.Width;
        imageFile.Height = this.Height
        imageFile.IsMain = this.IsMain;
        imageFile.Order = this.Order;
        return imageFile;
    }

    IsFile(file) {
        return file && typeof file === 'object' && file.constructor === File && file instanceof File;
    }
}

class IntArray {
    #values;

    #isUnique;

    constructor(isUnique) {
        this.#values = [];
        this.#isUnique = typeof isUnique === 'boolean' && isUnique;
    }

    All(callback) {
        for (var value of this.#values) {
            if (!callback(value))
                return false;
        }
        return true;
    };

    Any(callback) {
        if (callback) {
            for (var value of this.#values) {
                if (callback(value))
                    return true;
            }
            return false;
        }
        else {
            return this.#values.length > 0;
        }
    };

    Add(value) {
        if (this.IsNumber(value)) {
            if (this.#isUnique && !this.Any((v) => { return v == value; })) {
                this.#values.push(value);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };

    Find(callback) {
        for (var value of this.#values) {
            if (callback(value))
                return value;
        }
        return null;
    };

    Remove(callback) {
        const index = this.#values.findIndex(callback);
        if (index > -1) {
            this.#values.splice(index, 1);
            return true;
        }
        else
            return false;
    };

    GetPureValues() {
        return this.#values;
    }

    ToList() {
        return [...this.#values];
    };

    ToListOrderBy() {
        return [...this.#values].sort((a, b) => a - b);
    };

    IsNumber(number) {
        return number && typeof number === 'number' && !isNaN(number) && Number.isInteger(number);
    }
}

class ImageFileArray {
    #imageFiles;

    constructor() {
        this.#imageFiles = [];
    }

    All(callback) {
        for (var file of this.#imageFiles) {
            if (!callback(file))
                return false;
        }
        return true;
    };

    Any(callback) {
        if (callback) {
            for (var file of this.#imageFiles) {
                if (callback(file))
                    return true;
            }
            return false;
        }
        else {
            return this.#imageFiles.length > 0;
        }
    };

    Add(imageFile) {
        if (this.IsImageFile(imageFile)) {
            this.#imageFiles.push(imageFile);
            return true;
        }
        else {
            return false;
        }
    };

    Find(callback) {
        for (var imageFile of this.#imageFiles) {
            if (callback(imageFile))
                return imageFile;
        }
        return null;
    };

    Remove(argument) {
        let index;
        if (this.IsNumber(argument)) {
            index = this.#imageFiles.findIndex((i) => { return i.Id == argument; });
        }
        else if (this.isFunction(argument)) {
            index = this.#imageFiles.findIndex(argument);
        }
        if (index > -1) {
            this.#imageFiles.splice(index, 1);
            return true;
        }
        else
            return false;
    };

    Where(callback) {
        if (this.IsFunction(callback)) {
            const result = [];
            for (var file of this.#imageFiles) {
                if (callback(file)) {
                    result.push(file);
                }
            }
            return [...result];
        }
        else {
            return null;
        }
    };

    PureWhere(callback) {
        if (this.IsFunction(callback)) {
            const result = [];
            for (var file of this.#imageFiles) {
                if (callback(file)) {
                    result.push(file);
                }
            }
            return result.sort((a, b) => a.Order - b.Order);;
        }
        else {
            return null;
        }
    };

    Count() {
        return this.#imageFiles.length;
    }

    GetPureValues() {
        return this.#imageFiles;
    };

    GetPureValuesOrderBy() {
        return this.#imageFiles.sort((a, b) => a.Order - b.Order);
    };

    ToList() {
        return [...this.#imageFiles];
    };

    ToListOrderBy() {
        return [...this.#imageFiles].sort((a, b) => a.Order - b.Order);
    };

    IsImageFile(imageFile) {
        return imageFile && typeof imageFile === 'object' && imageFile.constructor === ImageFile && imageFile instanceof ImageFile;
    };

    IsNumber(number) {
        return number && typeof number === 'number' && !isNaN(number) && Number.isInteger(number);
    };

    IsFunction($function) {
        return $function && typeof $function === "function" && {}.toString.call($function) === '[object Function]';
    };
}

class ImageContainer {
    #id;

    #order;

    #imageFiles;

    constructor() {
        this.#id = 1;
        this.#order = 1;
        this.#imageFiles = new ImageFileArray();
    };

    GetAllImageFiles() {
        return this.#imageFiles.ToListOrderBy();
    };

    Add(imageFile) {
        if (this.IsImageFile(imageFile)) {
            imageFile.Id = this.#id++;
            imageFile.Order = this.#order++;
            if (imageFile.Order == 1) {
                imageFile.IsMain = true;
            }
            this.#imageFiles.Add(imageFile.Clone());
        }
    };

    Find(callback) {
        return this.#imageFiles.Find(callback);
    };

    Remove(callback) {
        const currentImageFile = this.Find(callback);
        if (currentImageFile) {
            const currentOrder = currentImageFile.Order;
            if (this.#imageFiles.Remove(currentImageFile.Id)) {
                for (var imageFile of this.#imageFiles.PureWhere((x) => { return x.Order > currentOrder; })) {
                    imageFile.Order--;
                }
                //this.ReOrder(currentOrder);
                this.#order--;
                if (currentImageFile.IsMain && currentImageFile.Order != 1)
                    this.Find((x) => { return x.Order == 1; }).IsMain = true;
            }
        }
    }

    Count() {
        return this.#imageFiles.Count();
    }

    ChangeMain(id) {
        if (this.IsNumber(id)) {
            const currentImageFile = this.Find((x) => { return x.Id == id; });
            if (currentImageFile) {
                this.Find((x) => { return x.IsMain; }).IsMain = false;
                currentImageFile.IsMain = true;
            }
        }
    };

    ReOrder(fromOrder, toOrder) {
        const changedImageFile = this.Find((x) => { return x.Order == fromOrder; });
        if (fromOrder < toOrder) {
            for (var imageFile of this.#imageFiles.PureWhere((x) => { return x.Order > fromOrder && x.Order <= toOrder; })) {
                imageFile.Order--;
            }
        }
        else if (fromOrder > toOrder) {
            for (var imageFile of this.#imageFiles.PureWhere((x) => { return x.Order >= toOrder && x.Order < fromOrder; })) {
                imageFile.Order++;
            }
        }
        changedImageFile.Order = toOrder;

    }

    HasFile(callback) {
        return this.#imageFiles.Any(callback);
    };

    IsImageFile(imageFile) {
        return imageFile && typeof imageFile === 'object' && imageFile.constructor === ImageFile && imageFile instanceof ImageFile;
    };

    IsNumber(number) {
        return number && typeof number === 'number' && !isNaN(number) && Number.isInteger(number);
    };
}
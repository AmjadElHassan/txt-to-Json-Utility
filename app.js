const fs = require("fs")
//Global variables
const ordersPath = process.argv[2]
const dependenciesPath = process.argv[3]
let outputPath = process.argv[4]
let input = []
let tasks = []
let taskRelationships = []
let organizedOutput = []
let outputText = `{
    "orders": ${organizedOutput}
}`

function main() {
    retrieveText(ordersPath, dependenciesPath, outputPath)
    if (input.length != 2) return console.log('file processing error')
    organizeText(input)
    //create fully-rended order objects with dependents
    let populatedObjects = createObjects(tasks, taskRelationships)
    structureObjects(populatedObjects)
    // organizedOutput = populatedObjects
    // createJSONFile(organizedOutput)

}

function structureObjects(populatedObjects) {
    let parents = []
    let children = []
    let root = findRootObjects(populatedObjects,taskRelationships)

    let temp = root

    taskRelationships.forEach(x=>{
        parents.push(x.parent)
        children.push(x.dependent)
    })


    console.log(parents.indexOf(3))
    root.forEach(object=>{
        temp = object
        if (parents.indexOf(obj.id)){

        }
    })
    // console.log(root)
    // console.log(parents)
    // console.log(children)



}

function createJSONFile(data) {
    try {
        if (!outputPath) {
            outputPath = "./output.json"
        }
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
    }
    catch (err) {
        console.log(err)
        return
    }
}

function retrieveText(orderPath, depPath, outPath) {
    if (!orderPath || !depPath) {
        return console.log("missing input")
    }
    const ordersText = readFile(orderPath)
    const dependenciesText = readFile(depPath)
    if (!dependenciesText || !ordersText) {
        return console.log('invalid file Type provided')
    } else {
        input.push(ordersText)
        input.push(dependenciesText)
    }
}

function organizeText(inputArray) {
    let orders = inputArray[0]
    let dependencies = inputArray[1]
    orders.shift()
    dependencies.shift()
    orders.forEach(task => {
        task = task.split(',')
        tasks.push({ id: task[0], name: task[1], dependencies: [] })
    })
    dependencies.forEach(relationship => {
        relationship = relationship.split(',')
        taskRelationships.push({ parent: relationship[0], dependent: relationship[1] })
    })
}

function createObjects(items, relationships) {
    tempNestedItems = items
    // root.forEach(rootOrder => {
    //     //while temp.id
    // })
    relationships.forEach(relationship => {
        let parentObjectIndex
        let childObjectIndex
        items.forEach((obj, index) => {
            if (obj.id == relationship.parent) {
                parentObjectIndex = index
            }
            if (obj.id == relationship.dependent) {
                childObjectIndex = index
            }
        })
        tempNestedItems[parentObjectIndex].dependencies.push(tempNestedItems[childObjectIndex])
    })
    //at this point, tempNestedItems contains all items completely constructed
    return tempNestedItems

    // let rootObjects = findRootObjects(items,relationships)
    // populateRootDependencies(rootObjects,items, relationships)
}

function findRootObjects(items, relationships) {
    let root = []
    let children = relationships.map(x => x.dependent)
    items.forEach(item => {
        if (!children.includes(item.id)) {
            root.push(item)
        }
    })
    return root
    // let swag = items.filter(x=>children.includes(x.id))
    // console.log(swag)
    // console.log(children)
}

// function populateRootDependencies(root,items,relationships){
//     let rootIds = root.map(x=>x.id)
//     let children = relationships.map(x=>x.dependent)
//     root.forEach(x=>{
//         if (x.id)
//     })

//     let dependents = root.forEach(x=>{})
// }


//utility programs

function readFile(path) {
    try {
        return fs.readFileSync(`./${path}`, "utf8").trim().split('\n')
    } catch (err) {
        return undefined
    }
}

main()
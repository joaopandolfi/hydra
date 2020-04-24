const PermissionLevelController = {}

PermissionLevelController.CheckLevel = (req,res, level) =>{
    let checkedPermission = req.session.permission < level
    if (checkedPermission ) res.redirect('/forbidden')
    return !checkedPermission
}

PermissionLevelController.VerifyLevel = (req,level) =>{
    let checkedPermission = req.session.permission < level
    return !checkedPermission
}

/**
 *  Check if user company is the same requested
 *  TODO: Adicionar privilégio de admin
 */
PermissionLevelController.CheckCompany = (req,res,company) =>{
    let session = req.session
    let checkedPermission = req.session.company != company
    if (checkedPermission ) res.redirect('/forbidden')
    return !checkedPermission
}

module.exports = PermissionLevelController
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer  = require('multer');
const {storage}=require("../cloudConfig.js")
const upload = multer({storage })
// Index route
 router.
 route("/")
 .get( wrapAsync(listingController.index))
 .post(
      isLoggedIn,
      upload.single("Listing[image]"),
      validateListing,
      wrapAsync(listingController.createListing)
    );
    
    
//new route    
router.get("/new",isLoggedIn,listingController.renderNewForm);

    router.route("/:id")
    .get( wrapAsync(listingController.showListing))
    .delete( isOwner,wrapAsync(listingController.destroyListing)
    )
    .put( 
      isLoggedIn,
      isOwner,
      upload.single("Listing[image]"),
      validateListing,
      wrapAsync(listingController.updateListing)
    );
// Edit listing form route
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editForm)
  );
  
  
module.exports = router;
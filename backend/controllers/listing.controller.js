import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js";


export const addListing = async (req,res) => {
    try {
        let host = req.userId;
        let {title,description,rent,landMark,category,city, latitude, longitude} = req.body
        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image2[0].path)
        let image3 = await uploadOnCloudinary(req.files.image3[0].path)
        
        let listing = await Listing.create({
            title,
            description,
            rent,
            landMark,
            category,
            image1,
            image2,
            image3,
            city,
            host,
            latitude,
            longitude

        })
        let user = await User.findByIdAndUpdate(host,{$push:{listing:listing._id}},
            {new:true}
        )
        if(!user){
            res.status(404).json({message:"user not found"})
        }
        res.status(201).json(listing)


    } catch (error) {
        res.status(500).json({message: `AddListing error ${error}`})
    }
}

export const getListing = async (req, res) => {
    try {
        let listing = await Listing.find().sort({ createdAt: -1 }); // fixed
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: `getListing error ${error}` });
    }
};


export const findListing = async (req, res) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findById(id).populate("host", "name email");

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" }); // added return
        }

        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: `find listing error ${error}` });
    }
};


export const updateListing = async (req,res) => {

    try {
        let image1
        let image2 
        let image3
        let {id} = req.params;
       let {title,description,rent,landMark,category,city,isBooked} = req.body;
       if(req.files?.image1){
            image1 = await uploadOnCloudinary(req.files.image1[0].path)
        }
        if(req.files?.image2){
            image2 = await uploadOnCloudinary(req.files.image2[0].path)
        }
       if(req.files?.image3){
            image3 = await uploadOnCloudinary(req.files.image3[0].path)
        }
        
        
        let listing = await Listing.findByIdAndUpdate(id,{
  title,
  description,
  rent,
  landMark,
  category,
  image1,
  image2,
  image3,
  city,
  isBooked
},{new:true})
       return res.status(200).json(listing)
    } catch (error) {
        return res.status(501).json({message:`update listing error  ${error}`})
    }
}


export const deleteListing = async (req, res) => {
    try {
        let { id } = req.params;

        // Delete the listing
        let listing = await Listing.findByIdAndDelete(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Update the user who hosted the listing
        let user = await User.findByIdAndUpdate(
            listing.host,
            { $pull: { listing: listing._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: `DeleteListing error ${error}` });
    }
};


export const ratingListing = async (req,res) => {
    try {
        let {id} = req.params;
        let {rating} = req.body
        let listing = await Listing.findById(id)
        if(!listing){
            return res.status(404).json({message:"listing not found"})
        }
        await listing.save()
        return res.status(200).json({ratings:listing.rating})
    } catch (error) {
        return res.status(500).json({message:`rating error ${error}`})
    }
}

export const search = async (req,res) => {
    try {
        const {query} = req.query;
        if(!query){
            return res.status(400).json({message:"search query is required"})
        
        }
        const listing = await Listing.find({
            $or:[
                {landMark:{$regex:query,$options:"i"}},
                {city:{$regex:query,$options:"i"}},
                {title:{$regex:query,$options:"i"}}
            ]
        })
        return res.status(200).json(listing)
    } catch (error) {
        console.error("Search error:",error);
        return res.status(500).json({message:"internal server error"})
    }
}
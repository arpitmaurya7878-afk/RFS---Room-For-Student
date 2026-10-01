export const createBooking = async (req, res) => {
    try {
        let { id } = req.params;
        let { checkIn, checkOut, totalRent } = req.body;

        // Find listing
        let listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Validate dates
        if (new Date(checkIn) >= new Date(checkOut)) {
            return res.status(400).json({ message: "Invalid checkIn/checkOut date" });
        }

        // Check if already booked
        if (listing.isBooked) {
            return res.status(400).json({ message: "Listing is already booked" });
        }

        // Create booking
        let booking = await Booking.create({
            checkIn,
            checkOut,
            totalRent,
            host: listing.host,
            guest: req.userId,   // ✅ use req.userId
            listing: listing._id
        });

        // Update user with booking reference
        let user = await User.findByIdAndUpdate(
            req.userId,
            { $push: { booking: booking._id } }, // ✅ push booking ID
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update listing
        listing.guest = req.userId;
        listing.isBooked = true;
        await listing.save();

        return res.status(201).json(booking);
    } catch (error) {
        return res.status(500).json({ message: `createBooking error: ${error}` });
    }
};

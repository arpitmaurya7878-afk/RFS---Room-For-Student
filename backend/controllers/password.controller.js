import crypto from "crypto";
import User from "../model/user.model.js";
import resend from "../config/resend.js";
import bcrypt from "bcryptjs"

export const forgotPassword = async (req, res) => {
    try {
        let { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Create a random reset token
        let resetToken = crypto.randomBytes(32).toString("hex");

        // Save token and expiry in database
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiry = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Create reset link
        let resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        // Send reset email
        const { error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Reset Your Password",
            html: `
                <h2>Password Reset</h2>

                <p>You requested to reset your password.</p>

                <p>Click the link below to reset your password:</p>

                <a href="${resetLink}">
                    Reset Password
                </a>

                <p>This link will expire in 15 minutes.</p>
            `
        });

        if (error) {
            return res.status(500).json({
                message: "Failed to send reset email"
            });
        }

        return res.status(200).json({
            message: "Password reset link sent to your email"
        });

    } catch (error) {
        return res.status(500).json({
            message: `Forgot password error ${error}`
        });
    }
};



;

export const resetPassword = async (req, res) => {
    try {
        let { token } = req.params;
        let { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                message: "New password is required"
            });
        }

        let user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset link"
            });
        }

        // Hash the new password
        let hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        // Clear reset token after successful password reset
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiry = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `Reset password error ${error}`
        });
    }
};
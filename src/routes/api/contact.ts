import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(2000),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid JSON body" }, 400);
        }

        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
          return json(
            { error: "Validation failed", details: parsed.error.flatten() },
            400,
          );
        }

        const { name, email, message } = parsed.data;

        // Best-effort email via nodemailer when SMTP env vars are present.
        // Otherwise we log the submission for the host to inspect.
        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const toAddr   = process.env.CONTACT_TO ?? "kathaneashish599@gmail.com";

        if (smtpHost && smtpUser && smtpPass) {
          try {
            const nodemailer = await import("nodemailer");
            const transporter = nodemailer.createTransport({
              host: smtpHost,
              port: Number(process.env.SMTP_PORT ?? 587),
              secure: process.env.SMTP_SECURE === "true",
              auth: { user: smtpUser, pass: smtpPass },
            });
            await transporter.sendMail({
              from: `"Portfolio contact" <${smtpUser}>`,
              to: toAddr,
              replyTo: email,
              subject: `New message from ${name}`,
              text: `${message}\n\n— ${name} <${email}>`,
            });
            return json({ ok: true, delivery: "email" });
          } catch (err) {
            console.error("[contact] email failed:", err);
            // Fall through to log-only response
          }
        }

        console.log("[contact] submission", { name, email, message });
        return json({ ok: true, delivery: "logged" });
      },
    },
  },
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

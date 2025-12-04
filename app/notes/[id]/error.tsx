"use client";

interface errorMessageProps {
  error: Error;
}

function errorMessage({ error }: errorMessageProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}

export default errorMessage;

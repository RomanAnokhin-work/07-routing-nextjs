"use client";

interface errorMessageProps {
  error: Error;
}

function errorMessage({ error }: errorMessageProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}

export default errorMessage;

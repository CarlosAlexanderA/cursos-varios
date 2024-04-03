import React from 'react'

export default function LabelNewAccount({ children, title, description }) {
  return (
    <div>
      <h2 className="text-2xl mt-4">Title</h2>
      <p className="text-gray-500 text-sm">
        Title for your, should be short and catchy as in advertisement
      </p>
      {children}
    </div>
  )
}

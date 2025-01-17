export const events = [
  'onMouseDown',
  'onScroll',
  'onInput',
  'onClick',
  'onKeyUp',
  'onKeyDown',
  'onFocus',
  'onImageUpload',
  'onAudioUpload',
  'onVideoUpload',
  'onImageUploadError',
  'onVideoUploadError',
  'onAudioUploadError',
  'onSave',
  'onSetToolbarButtons',
  'imageUploadHandler',
  'toggleCodeView',
  'toggleFullScreen',
  'showInline',
  'showController',
  'onCopy',
  'onCut',
  'onDrop',
  'onPaste'
] as const

export const uploadBeforeEvents = [
  'onImageUploadBefore',
  'onVideoUploadBefore',
  'onAudioUploadBefore'
] as const

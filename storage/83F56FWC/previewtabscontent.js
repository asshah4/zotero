
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (PreviewTabsContent == null) var PreviewTabsContent = {};
PreviewTabsContent._path = '/dwr';
PreviewTabsContent.getAbstractText = function(p0, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'getAbstractText', p0, callback);
}
PreviewTabsContent.getStructure = function(p0, p1, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'getStructure', p0, p1, callback);
}
PreviewTabsContent.getFiguresAndTablesText = function(p0, p1, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'getFiguresAndTablesText', p0, p1, callback);
}
PreviewTabsContent.getReferences = function(p0, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'getReferences', p0, callback);
}
PreviewTabsContent.error = function(p0, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'error', p0, callback);
}
PreviewTabsContent.warning = function(p0, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'warning', p0, callback);
}
PreviewTabsContent.processingInstruction = function(p0, p1, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'processingInstruction', p0, p1, callback);
}
PreviewTabsContent.resolveEntity = function(p0, p1, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'resolveEntity', p0, p1, callback);
}
PreviewTabsContent.characters = function(p0, p1, p2, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'characters', p0, p1, p2, callback);
}
PreviewTabsContent.endDocument = function(callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'endDocument', callback);
}
PreviewTabsContent.endElement = function(p0, p1, p2, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'endElement', p0, p1, p2, callback);
}
PreviewTabsContent.endPrefixMapping = function(p0, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'endPrefixMapping', p0, callback);
}
PreviewTabsContent.fatalError = function(p0, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'fatalError', p0, callback);
}
PreviewTabsContent.ignorableWhitespace = function(p0, p1, p2, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'ignorableWhitespace', p0, p1, p2, callback);
}
PreviewTabsContent.notationDecl = function(p0, p1, p2, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'notationDecl', p0, p1, p2, callback);
}
PreviewTabsContent.setDocumentLocator = function(p0, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'setDocumentLocator', p0, callback);
}
PreviewTabsContent.skippedEntity = function(p0, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'skippedEntity', p0, callback);
}
PreviewTabsContent.startDocument = function(callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'startDocument', callback);
}
PreviewTabsContent.startElement = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'startElement', p0, p1, p2, p3, callback);
}
PreviewTabsContent.startPrefixMapping = function(p0, p1, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'startPrefixMapping', p0, p1, callback);
}
PreviewTabsContent.unparsedEntityDecl = function(p0, p1, p2, p3, callback) {
  dwr.engine._execute(PreviewTabsContent._path, 'PreviewTabsContent', 'unparsedEntityDecl', p0, p1, p2, p3, callback);
}

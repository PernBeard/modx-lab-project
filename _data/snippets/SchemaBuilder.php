id: 3
source: 1
name: SchemaBuilder
properties: 'a:0:{}'

-----

/**
* @package = CreateXpdoClasses
*
* Create Xpdo Classes script
*
* This script creates xPDO-ready classes from existing custom
* database tables. It only needs to be run once.
*
* It assumes that your custom tables have been imported into
* the MODx DB and use a different table prefix than the MODx tables.

* In theory, you can use a separate DB but this has not been tested
* and the process of using the classes would be more complicated.
* To do this, you would need to set the following variables after
* including the config file, but before creating the $modx object:
*
* $database_server = 'yourDbServer';
* $database_type = 'mysql';
* $dbase = 'yourDbName';
* $database_user = 'user';
* $database_password = 'password';
* $table_prefix = 'yourPrefix_';
*
* In the snippets that use the classes, you'd need to instantiate
* a new $xpdo object, and use $xpdo-> rather than $modx-> to call
* the methods.
* $xpdo = new xPDO('mysql:host=localhost;dbname=yourDbName',
*   $database_user,$database_password,$table_prefix);
*
* Note: If you are running this outside of MODx and testing it
* in the Manager, it will log you out when it runs, even though
* the Manager screen will still be visible. Actions taken in the
* Manager (e.g., saving a snippet) will not be successful. After
* running the script, reload the Manager page in your browser
* and you will be prompted to log back in.
*
*
*/
/* assume we're in a snippet */
$outsideModx = false;

 if (!defined('MODX_CORE_PATH')) {
     $outsideModx = true;
    /* put the path to your core in the next line to run outside of MODx */
    define(MODX_CORE_PATH, 'c:/xampp/htdocs/test/core/');
    include_once MODX_CORE_PATH . '/model/modx/modx.class.php';
    $modx= new modX();
    $modx->initialize('mgr');
}

/* set these if running outside of MODx */

if ($outsideModx) {
    $myPackage = 'mypackage';

    /* table prefix; must match the prefix of the tables to process */
    $myPrefix  = 'bobs_';

    /* optional -- only if your table prefix is the same as the modx prefix */
    // $myTables = 'bobs_quotation';
}



/* These two switches let you write the schema and/or create the classes;
 * useful for debugging and for leaving a manually edited schema file alone*/
$createSchema = $modx->getOption('createSchema',$scriptProperties,true);
$createClasses = $modx->getOption('createClasses',$scriptProperties,true);

/* Used to include the phpDoc templates below or other custom templates */
$includeCustomTemplates = empty($includeCustomTemplates)?
    false : $includeCustomTemplates;

/* $myPackage is the name of your package. Use this in your
 * addPackage() call to load all classes created by this script.
 *  The class files will be created under the
 * /core/components/$myPackage/model/
 * directory.
 * Example:
 *     $myPackage = 'quotes';
 *     $myPrefix = 'bobs_';
 *     $path = MODX_CORE_PATH . 'components/' . $myPackage . '/';
 *     $result = $modx->addPackage($myPackage, $path . 'model/', $myPrefix);
 *     if (! $result) {
 *         return('Failed to add package');
 *     }
 */
$myPackage = empty($myPackage)? 'myackage' : $myPackage;

/* table prefix; must match the prefix of the tables you want to process */
$myPrefix = empty ($myPrefix)? '' : $myPrefix;

/* Table names to process -- this is only necessary if your table prefix is
 * the same as that of the MODx tables. You can send a comma-separated list
 * of full table names. In that case the class name will be the table name
 * minus the prefix with any underscores removed and any letter after an
 * underscore in upper case.
 *
 * You can also send an array of arrays of tableName => className,
 * which allows you to specify the exact class name rather then letting
 * MODx create it from the table name. Each inner array specifies a full
 * table name and the class name to use.
 *
 * NOTE: This feature may not be implemented yet.
 *
 * Examples:

 $myTables = 'bobs_quotation';

 $myTables = array(
     array(
        'bobs_quotation'=>'bobQuotation'
     )
 );

*/
$myTables = empty($myTables)? '' : $myTables;

/* You shouldn't need to modify the code beyond this point
********************************************************** */

$sources = array(
    'config' => MODX_CORE_PATH . 'config/config.inc.php',
    'package' => MODX_CORE_PATH . 'components/' . $myPackage . '/',
    'model' => MODX_CORE_PATH. 'components/' . $myPackage . '/model/',
    'schema' => MODX_CORE_PATH . 'components/' . $myPackage . '/schema/',
    );

if (! file_exists($sources['package'])) {
    mkdir($sources['package'],0777);
}

if (! file_exists($sources['model'])) {
    mkdir($sources['model'],0777);
}
if (! file_exists($sources['schema'])) {
    mkdir($sources['schema'],0777);
}

$modx->setLogLevel(modX::LOG_LEVEL_INFO);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');

$manager= $modx->getManager();
$generator= $manager->getGenerator();

if ($includeCustomTemplates) {
    customTemplates($generator);
}


$file = $sources['schema'] . $myPackage . '.mysql.schema.xml';

// echo '<br />File: ' . $file;

/* boolean writeSchema (
 *   string $schemaFile,  // Full path to the schema file you want to write
 *   [string $package = ''], //  Name of your component
 *   [string $baseClass = ''], // xPDO base class to use;
 *                                 send '' if using args below
 *   [string $tablePrefix = ''], // Table prefix (of tables to process)
 *   [boolean $restrictPrefix = false]), // Process only tables
 *                                          with $tablePrefix
 *   [mixed $tableList = '' // Array of arrays of
 *                             full-table-name=>className or
 *                             a string with a comma-separated
 *                             list of full table names;
 *                             if you send the string the table
 *                             name will be used as the class name.
*/

if ($createSchema) {

    $xml= $generator->writeSchema($file,
                $myPackage, '',$myPrefix,true,$myTables);

    if ($xml) {
       $modx->log(modX::LOG_LEVEL_INFO,
           'Schema file written to ' . $file);
    } else {
        $modx->log(modX::LOG_LEVEL_INFO,
           'Error writing schema file');
    }
}

if ($createClasses) {
     if ($generator->parseSchema($file, $sources['model'])) {
         $modx->log(modX::LOG_LEVEL_INFO,
            'Schema file parsed -- Files written to '. $sources['model']);
     } else {
         $modx->log(modX::LOG_LEVEL_INFO, 'Error parsing schema file');
     }
}
 $modx->log(modX::LOG_LEVEL_INFO, 'FINISHED');
 exit();

 function customTemplates($generator) {
$generator->classTemplate= <<<EOD
<?php
/**
 *
 *
 */
class  extends  {
}
?>
EOD;
$generator->platformTemplate= <<<EOD
<?php
/**
 *
 *
 */
require_once (dirname(dirname(__FILE__)) . '/.class.php');
class _ extends  {
}
?>
EOD;
$generator->mapHeader= <<<EOD
<?php
/**
 *
 *
 */
EOD;
}
// app/genx/components/GenXComponentReplacer.tsx
import React from 'react';

interface ComponentMapping {
  [originalComponentName: string]: React.ComponentType<any>;
}

export class GenXComponentReplacer {
  private static componentMappings: ComponentMapping = {};
  
  static registerReplacement(originalName: string, replacement: React.ComponentType<any>) {
    this.componentMappings[originalName] = replacement;
  }
  
  static wrapComponent<T extends {}>(
    OriginalComponent: React.ComponentType<T>,
    componentName: string
  ): React.ComponentType<T> {
    return (props: T) => {
      // Check if we have a replacement
      const Replacement = this.componentMappings[componentName];
      
      if (Replacement) {
        return <Replacement {...props} originalComponent={OriginalComponent} />;
      }
      
      // Otherwise, wrap with GenX enhancements
      return (
        <div className={`genx-enhanced-${componentName.toLowerCase()}`}>
          <OriginalComponent {...props} />
        </div>
      );
    };
  }
}

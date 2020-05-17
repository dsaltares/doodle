import React from 'react';
import Grid from '@material-ui/core/Grid';

import ToolBar from '../ToolBar';
import { SketchField } from './Editor.styled';

type Tool = 'pencil' | 'eraser';
type Props = {};
type State = {
  lineWidth: number;
  color: string;
  tool: Tool;
  canUndo: boolean;
  canRedo: boolean;
};

class Editor extends React.Component<Props, State> {
  private sketch: SketchField;

  constructor(props: Props) {
    super(props);

    this.state = {
      lineWidth: 10,
      color: '#f44336',
      tool: 'pencil',
      canUndo: false,
      canRedo: false,
    };

    this.onLineWidthChange = this.onLineWidthChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onToolChange = this.onToolChange.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.onRedo = this.onRedo.bind(this);
    this.onEraseAll = this.onEraseAll.bind(this);
    this.onSketchChange = this.onSketchChange.bind(this);
  }

  onLineWidthChange(lineWidth: number) {
    this.setState({ lineWidth });
  }

  onColorChange(color: string) {
    this.setState({ color });
  }

  onToolChange(tool: Tool) {
    this.setState({ tool });
  }

  onUndo() {
    if (!this.sketch) {
      return;
    }
    this.sketch.undo();
  }

  onRedo() {
    if (!this.sketch) {
      return;
    }
    this.sketch.redo();
  }

  onEraseAll() {
    if (!this.sketch) {
      return;
    }
    this.sketch.clear();
  }

  onSketchChange() {
    if (!this.sketch) {
      return;
    }

    const { canUndo, canRedo } = this.state;
    const canUndoNow = this.sketch.canUndo();
    const canRedoNow = this.sketch.canRedo();
    const needsUpdate = canUndo !== canUndoNow || canRedo !== canRedoNow;
    if (needsUpdate) {
      this.setState({
        canUndo: canUndoNow,
        canRedo: canRedoNow,
      });
    }
  }

  export(): string {
    if (!this.sketch) {
      return '';
    }
    return this.sketch.toDataURL();
  }

  render() {
    const { lineWidth, color, tool, canUndo, canRedo } = this.state;

    const editorColor = tool === 'pencil' ? color : '#ffffff';

    return (
      <Grid container direction="row">
        <Grid item xs={2}>
          <ToolBar
            lineWidth={lineWidth}
            onLineWidthChange={this.onLineWidthChange}
            color={color}
            onColorChange={this.onColorChange}
            tool={tool}
            onToolChange={this.onToolChange}
            canUndo={canUndo}
            onUndo={this.onUndo}
            canRedo={canRedo}
            onRedo={this.onRedo}
            onEraseAll={this.onEraseAll}
          />
        </Grid>
        <Grid item xs={10}>
          <SketchField
            ref={(sketch: any) => (this.sketch = sketch)}
            height="480px"
            tool={tool}
            lineColor={editorColor}
            lineWidth={lineWidth}
            onChange={this.onSketchChange}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Editor;
